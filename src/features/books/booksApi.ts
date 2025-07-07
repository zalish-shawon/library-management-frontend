import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-api-pied.vercel.app/api/' }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({

getBooks: builder.query<Book[], void>({
  query: () => '/books',
  providesTags: ['Books'],
  transformResponse: (response: { success: boolean; data: Book[] }) => response.data,
}),
    getBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
    }),

    addBook: builder.mutation<void, Partial<Book>>({
      query: (book) => ({
        url: 'books',
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['Books'],
    }),
    
    updateBook: builder.mutation<void, { id: string; data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `books/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Books'],
    }),
    
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;