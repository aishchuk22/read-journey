import { createSlice } from '@reduxjs/toolkit';
import { fetchRecommendedBooks } from './booksOperations';

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchRecommendedBooks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecommendedBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecommendedBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const booksReducer = booksSlice.reducer;