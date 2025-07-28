import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendedBooks, addToLibrary, getUsersBooks, removeFromLibrary } from '../../api/booksApi';
import { selectToken } from '../auth/authSelectors';

export const fetchRecommendedBooks = createAsyncThunk(
  'books/fetchRecommended',
  async ({ page = 1, title = '', author = '', limit = 2 }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      const data = await getRecommendedBooks({ page, limit, title, author });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const validateAndAddBook = createAsyncThunk(
  'books/validateAndAddBook',
  async (bookData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      const searchResult = await getRecommendedBooks({ 
        page: 1, 
        limit: 10, 
        title: bookData.title, 
        author: bookData.author 
      });

      const exactMatch = searchResult.results.find(book => 
        book.title.toLowerCase().trim() === bookData.title.toLowerCase().trim() &&
        book.author.toLowerCase().trim() === bookData.author.toLowerCase().trim()
      );

      if (!exactMatch) {
        return thunkAPI.rejectWithValue('Book not found in our database. Please try again.');
      }

      const data = await addToLibrary(bookData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addBookToLibrary = createAsyncThunk(
  'books/addToLibrary',
  async (bookData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      const data = await addToLibrary(bookData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUsersBooks = createAsyncThunk(
  'books/fetchUsersBooks',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      const data = await getUsersBooks();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeBookFromLibrary = createAsyncThunk(
  'books/removeFromLibrary',
  async (bookId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      await removeFromLibrary(bookId);
      return bookId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);