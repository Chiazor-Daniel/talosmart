
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://assignment-api-spxd.onrender.com/api',
  }),
  endpoints: (builder) => ({
    createPostWithImage: builder.mutation({
      query: ({ username, base64str, post }) => ({
        url: '/createpost',
        method: 'post',
        body: { username, base64str, post },
      }),
    }),
    createPost: builder.mutation({
      query: ({ username, post }) => ({
        url: '/posts',
        method: 'post',
        body: { username, post },
      }),
    }),
    retrievePostsByUser: builder.query({
      query: (email) => `/posts/${email}`,
    }),
  }),
});

export const {
  useCreatePostWithImageMutation,
  useCreatePostMutation,
  useRetrievePostsByUserQuery,
} = postsApi;
