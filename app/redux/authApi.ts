import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-api-spxd.onrender.com/api",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "post",
        body,
      }),
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "/register", 
        method: "post",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
