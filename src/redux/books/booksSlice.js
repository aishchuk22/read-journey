import { createSlice } from '@reduxjs/toolkit';
import { fetchRecommendedBooks, addBookToLibrary, fetchUsersBooks, removeBookFromLibrary, validateAndAddBook } from './booksOperations';

const initialState = {
  books: [],
  myLibraryBooks: [],
  isLoading: false,
  isLibraryLoading: false,
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
      })
      // Додаємо обробку для validateAndAddBook
      .addCase(validateAndAddBook.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(validateAndAddBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myLibraryBooks.push(action.payload);
      })
      .addCase(validateAndAddBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addBookToLibrary.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBookToLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myLibraryBooks.push(action.payload);
      })
      .addCase(addBookToLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsersBooks.pending, state => {
        state.isLibraryLoading = true;
        state.error = null;
      })
      .addCase(fetchUsersBooks.fulfilled, (state, action) => {
        state.isLibraryLoading = false;
        state.myLibraryBooks = action.payload;
      })
      .addCase(fetchUsersBooks.rejected, (state, action) => {
        state.isLibraryLoading = false;
        state.error = action.payload;
      })
      .addCase(removeBookFromLibrary.fulfilled, (state, action) => {
        state.myLibraryBooks = state.myLibraryBooks.filter(
          book => book._id !== action.meta.arg
        );
      }),
});

export const { setFilters, clearFilters } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;