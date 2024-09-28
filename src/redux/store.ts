import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/redux/features/authSlice'
import { apiSlice } from "./services/apiSlice";

export const Store = () => 
    configureStore({
        reducer: {
            [apiSlice.reducerPath]: apiSlice.reducer,
            auth: authReducer
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(apiSlice.middleware),
        devTools: process.env.NODE_ENV !== 'production',
    });


export type AppStore = ReturnType<typeof Store>;
export type RootState = ReturnType<AppStore['getState']>;
export type Appdispatch = AppStore['dispatch'];