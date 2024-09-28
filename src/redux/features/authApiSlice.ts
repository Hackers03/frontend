import { apiSlice } from "../services/apiSlice";

export interface User {
    id: number;
    nickname: string;
    email: string;
}

interface SocialAuthArgs {
    provider: string;
    state: string;
    code: string;
}

interface CreateUserResponse {
    success: boolean;
    user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        retrieveUser: builder.query<User, void>({
            query: () => "/users/me/",
        }),

        socialAuthenticate: builder.mutation({
            //this part for so
            query: ({ provider, state, code }) => ({
                url: `/o/${provider}?state=${encodeURIComponent(
                    state
                )}&code=${encodeURIComponent(code)}/`,
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/x-www-form-urlencoded",
                },
            }),
        }),

        //login
        login: builder.mutation({
            query: (credential: { email: string; password: string }) => ({
                url: "/jwt/create/",
                method: "POST",
                body: credential,
            }),
        }),
        
        //logout
        logout: builder.mutation({
            query: () => ({
                url: '/logout/',
                method: 'POST'
            }),
        }),

        //verify
        verify: builder.mutation({
            query: () => ({
                url: "/jwt/verify/",
                method: "POST",
            }),
        }),

        //register
        register: builder.mutation({
            query: (credential: {
                nickname: string;
                email: string;
                password: string;
                re_password: string;
            }) => ({
                url: "/users/",
                method: "POST",
                body: credential,
            }),
        }),

        //activation
        activation: builder.mutation({
            query: ({ uid, token }: {uid: string, token: string}) => ({
                url: `/users/activation/`,
                method: "POST",
                body: { uid, token },
            }),
        }),

        //resetPassword
        resetPassword: builder.mutation({
            query: (email) => ({
                url: `/users/reset_password/`,
                method: "POST",
                body: { email },
            }),
        }),

        //resetPasswordConfirm
        resetPasswordConfirm: builder.mutation({
            query: ({ uid, token, new_password, re_new_password }) => ({
                url: `/users/reset_password_confirm/`,
                method: "POST",
                body: { uid, token, new_password, re_new_password },
            }),
        }),
    }),
});

export const{
    useRetrieveUserQuery,
    useSocialAuthenticateMutation,
    useLoginMutation,
    useLogoutMutation,
    useVerifyMutation,
    useRegisterMutation,
    useActivationMutation,
    useResetPasswordMutation,
    useResetPasswordConfirmMutation,

   
  } = authApiSlice;