import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecommendedBooks } from '../../api/booksApi';
import { selectToken } from '../auth/authSelectors';

export const fetchRecommendedBooks = createAsyncThunk(
  'books/fetchRecommended',
  async (page = 1, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = selectToken(state);

      if (!token) {
        return thunkAPI.rejectWithValue('No token available');
      }

      const data = await getRecommendedBooks({ page, limit: 8 });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);