import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Borrow } from '../../types';

export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://library-api-pied.vercel.app/api/' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<void, Borrow>({
      query: (data) => ({
        url: 'borrow', 
        method: 'POST',
        body: data,   
      }),
      invalidatesTags: ['Borrow'],
    }),
    getBorrowSummary: builder.query<any[], void>({
      query: () => 'borrow',
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
