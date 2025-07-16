import { createSlice } from '@reduxjs/toolkit';
import { register, login, logout, refreshUser } from './authOperations';

const initialState = {
  user: { name: null, email: null },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user = { name: payload.name, email: payload.email };
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = { name: payload.name, email: payload.email };
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.user = { name: payload.name, email: payload.email };
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;