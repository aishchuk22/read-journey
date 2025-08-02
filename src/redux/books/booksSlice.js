import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchRecommendedBooks, 
  addBookToLibrary, 
  fetchUsersBooks, 
  removeBookFromLibrary, 
  validateAndAddBook,
  fetchBookDetails,
  startReading,
  stopReading,
  deleteReadingSessionThunk
} from './booksOperations';

const initialState = {
  books: [],
  myLibraryBooks: [],
  currentBook: null,
  isLoading: false,
  isLibraryLoading: false,
  isReadingLoading: false,
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
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
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
      })
      .addCase(fetchBookDetails.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(startReading.pending, state => {
        state.isReadingLoading = true;
        state.error = null;
      })
      .addCase(startReading.fulfilled, (state, action) => {
        state.isReadingLoading = false;
        if (state.currentBook && action.payload) {
          state.currentBook = {
            ...state.currentBook,
            ...action.payload,
            status: 'in-progress',
            imageUrl: state.currentBook.imageUrl
          };
        }
        const bookIndex = state.myLibraryBooks.findIndex(
          book => book._id === state.currentBook?._id
        );
        if (bookIndex !== -1) {
          state.myLibraryBooks[bookIndex].status = 'in-progress';
        }
      })
      .addCase(startReading.rejected, (state, action) => {
        state.isReadingLoading = false;
        state.error = action.payload;
      })
      .addCase(stopReading.pending, state => {
        state.isReadingLoading = true;
        state.error = null;
      })
      .addCase(stopReading.fulfilled, (state, action) => {
        state.isReadingLoading = false;
        if (state.currentBook && action.payload) {
          state.currentBook = {
            ...state.currentBook,
            ...action.payload,
            imageUrl: state.currentBook.imageUrl
          };
          
          if (action.payload.progress && action.payload.progress.length > 0) {
            const lastProgress = action.payload.progress[action.payload.progress.length - 1];
            const isFinished = lastProgress.finishPage >= state.currentBook.totalPages;
            state.currentBook.status = isFinished ? 'done' : 'unread';
          }
        }
        
        const bookIndex = state.myLibraryBooks.findIndex(
          book => book._id === state.currentBook?._id
        );
        if (bookIndex !== -1 && action.payload) {
          state.myLibraryBooks[bookIndex] = {
            ...state.myLibraryBooks[bookIndex],
            ...action.payload,
            imageUrl: state.myLibraryBooks[bookIndex].imageUrl
          };
          
          if (action.payload.progress && action.payload.progress.length > 0) {
            const lastProgress = action.payload.progress[action.payload.progress.length - 1];
            const isFinished = lastProgress.finishPage >= state.currentBook.totalPages;
            state.myLibraryBooks[bookIndex].status = isFinished ? 'done' : 'unread';
          }
        }
      })
      .addCase(deleteReadingSessionThunk.pending, state => {
        state.isReadingLoading = true;
        state.error = null;
      })
      .addCase(deleteReadingSessionThunk.fulfilled, (state, action) => {
        state.isReadingLoading = false;
        if (state.currentBook && action.payload) {
          state.currentBook = {
            ...state.currentBook,
            ...action.payload,
            imageUrl: state.currentBook.imageUrl
          };
        }
        
        const bookIndex = state.myLibraryBooks.findIndex(
          book => book._id === state.currentBook?._id
        );
        if (bookIndex !== -1 && action.payload) {
          state.myLibraryBooks[bookIndex] = {
            ...state.myLibraryBooks[bookIndex],
            ...action.payload,
            imageUrl: state.myLibraryBooks[bookIndex].imageUrl
          };
        }
      })
      .addCase(deleteReadingSessionThunk.rejected, (state, action) => {
        state.isReadingLoading = false;
        state.error = action.payload;
      })
});

export const { setFilters, clearFilters, clearCurrentBook } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;