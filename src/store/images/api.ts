import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imagesApi = createApi({
  reducerPath: "imagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/images" }),
  endpoints: (builder) => ({
    postImage: builder.mutation<{}, { file: File }>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostImageMutation } = imagesApi;
