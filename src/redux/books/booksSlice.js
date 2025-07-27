import { createSlice } from '@reduxjs/toolkit';
import { fetchRecommendedBooks } from './booksOperations';

const initialState = {
  books: [],
  isLoading: false,
  error: null,
  page: 1,
  totalPages: 1,
  filters: {
    title: '',
    author: ''
  }
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
    },
    clearFilters: (state) => {
      state.filters = { title: '', author: '' };
      state.page = 1;
    }
  },
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

export const { setFilters, clearFilters } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;