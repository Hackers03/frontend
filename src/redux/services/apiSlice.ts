import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, setLogout } from "../features/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const BaseQuery = fetchBaseQuery({
    //baseUrl: `http://127.0.0.1/api`,
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
});

const BaseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is availble without locking it
    await mutex.waitForUnlock();
    let result = await BaseQuery(args, api, extraOptions);
    if (result.error && (result.error.status === 401 || result.error.status === 400)) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await BaseQuery(
                    {
                        url: "/jwt/refresh/",
                        method: "POST",
                    },
                    api,
                    extraOptions
                );
                if (refreshResult.data) {
                    api.dispatch(setAuth());
                    result = await BaseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(setLogout());
                }
            } finally {
                release();
            }
        } else {
            // wait untill the mutex is availble without locking it
            await mutex.waitForUnlock();
            result = await BaseQuery(args, api, extraOptions);
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: BaseQueryWithReauth,
    endpoints: (builder) => ({}),
});
