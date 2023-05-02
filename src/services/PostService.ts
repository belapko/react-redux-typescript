import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/IPost";

// export const postAPI = createApi({
//     reducerPath: 'postAPI',
//     baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
//     endpoints: (build) => ({
//         fetchAllPosts: build.query({
//             query: () => ({
//                 url: '/posts'
//             })
//         })
//     })
// })

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['POST'], // Это чтобы страничка подгрузила данные после совершения POST запроса (добавления поста)
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], number>({
            query: (limit: number = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ['POST'] // Говорим что вот этот ендпоинт работает с тегом POST
        }),
        createPost: builder.mutation<IPost, IPost>({ // Аргумент 1 - то что вернётся, аргумент 2 - то что ожидаем
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['POST'], // при создании поста говорим что наши данные что были неактуальны
        }),
        updatePost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: '/posts/' + post.id,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['POST'],
        }),
        deletePost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: '/posts/' + post.id,
                method: 'DELETE',
            }),
            invalidatesTags: ['POST'],
        }),
    }),
})

export const {useFetchAllPostsQuery} = postAPI;