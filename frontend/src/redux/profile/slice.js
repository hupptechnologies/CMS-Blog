import { createSlice } from '@reduxjs/toolkit';
import { getUserProfileAsync, getAllUsersAsync, updateUserProfileAsync } from './index';

const initialState = {
  loading: false,
  profile: {},
  users: [],
  usersTypes: [],
  totalCount: 0
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfileAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.profile = payload.data;
    });
    builder.addCase(getUserProfileAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllUsersAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsersAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload.data;
      state.usersTypes = payload.userTypes;
      state.totalCount = payload.totalCount;
    });
    builder.addCase(getAllUsersAsync.rejected, (state) => {
      state.loading = false;
      state.users = [];
      state.usersTypes = [];
      state.totalCount = 0;
    });
    builder.addCase(updateUserProfileAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfileAsync.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const getAllProfileDetail = (state) => state.profile;

export default profileSlice.reducer;
