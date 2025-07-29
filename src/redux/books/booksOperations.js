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
        book.author.toLowerCase().trim() === bookData.author.toLowerCase().trim() &&
        book.totalPages === bookData.totalPages
      );

      if (!exactMatch) {
        return thunkAPI.rejectWithValue('Book not found in our database. Please try again.');
      }

      const bookDataToSend = {
        title: exactMatch.title,
        author: exactMatch.author,
        totalPages: exactMatch.totalPages,
      };

      const addedBook = await addToLibrary(bookDataToSend);

      return {
        ...addedBook,
        imageUrl: exactMatch.imageUrl,
      };

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

      const userBooks = await getUsersBooks();
      const allRecommended = await getRecommendedBooks({ limit: 1000 });

      const enrichedBooks = userBooks.map(userBook => {
        const match = allRecommended.results.find(rec =>
          rec.title.toLowerCase().trim() === userBook.title.toLowerCase().trim() &&
          rec.author.toLowerCase().trim() === userBook.author.toLowerCase().trim()
        );
        return {
          ...userBook,
          imageUrl: match?.imageUrl || "",
        };
      });

      return enrichedBooks;
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