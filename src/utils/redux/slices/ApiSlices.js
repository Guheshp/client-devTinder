import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: 'myApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5173', }),
    endpoints: (builder) => ({
        getFeed: builder.query({
            query: () => '/feed',
        }),
        getUser: builder.query({
            query: () => '/user',
        }),
    }),
});

export const { useGetUsersQuery } = myApi;
