import { createSlice } from '@reduxjs/toolkit';
import {
  createNewUserAsync,
  loginExistingUserAsync,
  logoutLoggedInUserAsync,
  updateUserWelcomeMessageAsync
} from './index';

const initialState = {
  user: {},
  loading: false,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogoutUser: (state) => {
      state.user = {};
      state.token = null;
      state.loading = false;
    },
    handleStopWelcome: (state) => {
      state.user.has_seen_welcome_message = true;
    },
    handleUpdateUser: (state, { payload }) => {
      state.user.access = payload.access;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewUserAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.data;
    });
    builder.addCase(createNewUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(loginExistingUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginExistingUserAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state.user = payload.user;
    });
    builder.addCase(loginExistingUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutLoggedInUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutLoggedInUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserWelcomeMessageAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserWelcomeMessageAsync.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { handleLogoutUser, handleStopWelcome, handleUpdateUser } = authSlice.actions;

export const getAllUserDetail = (state) => state.auth;

export default authSlice.reducer;
