import { createSlice } from '@reduxjs/toolkit';
import { fetchAPIsLogsAsync } from './index';

const initialState = {
  APIlogs: [],
  loading: false,
  pagination: {},
  logStatus: [],
  totalCount: 0
};

const logSlice = createSlice({
  name: 'log',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAPIsLogsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAPIsLogsAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.APIlogs = payload.data;
      state.pagination = payload.pagination;
      state.logStatus = payload.logStatus;
      state.totalCount = payload.totalCount;
    });
    builder.addCase(fetchAPIsLogsAsync.rejected, (state) => {
      state.loading = false;
      state.APIlogs = [];
      state.pagination = {};
      state.logStatus = [];
    });
  }
});

export const getAllAPILogsDetail = (state) => state.log;

export default logSlice.reducer;
