import { createSlice } from '@reduxjs/toolkit';
import {
  deactivateUserAsync,
  deleteUsersActivityAsync,
  fetchAllAdminsAsync,
  getUsersActivitiesAsync,
  getUsersActivityTypesAsync,
  getUsersStatisticsAsync,
  logoutAnyUserAsync,
  updateAccessUserAsync,
  updateAdminAccessAsync
} from './index';

const initialState = {
  statistics: {},
  loading: false,
  statisticsLoading: false,
  activitiesLoading: false,
  activities: [],
  activityTypes: [],
  totalTypeCount: 0,
  isModal: {
    open: false,
    data: {}
  },
  totalPages: 1,
  totalItems: 0,
  allAdminUsers: []
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    handleViewDetail: (state, { payload }) => {
      state.isModal = { open: !state.isModal.open, data: payload?.data };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersStatisticsAsync.pending, (state) => {
      state.statisticsLoading = true;
    });
    builder.addCase(getUsersStatisticsAsync.fulfilled, (state, { payload }) => {
      state.statisticsLoading = false;
      state.statistics = payload.data;
    });
    builder.addCase(getUsersStatisticsAsync.rejected, (state) => {
      state.statisticsLoading = false;
      state.statistics = {};
    });
    builder.addCase(getUsersActivitiesAsync.pending, (state) => {
      state.activitiesLoading = true;
    });
    builder.addCase(getUsersActivitiesAsync.fulfilled, (state, { payload }) => {
      state.activitiesLoading = false;
      state.activities = payload.data;
      state.totalPages = payload.totalPages;
      state.totalItems = payload.totalItems;
    });
    builder.addCase(getUsersActivitiesAsync.rejected, (state) => {
      state.activitiesLoading = false;
      state.activities = [];
      state.totalPages = 1;
      state.totalItems = 0;
    });
    builder.addCase(getUsersActivityTypesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUsersActivityTypesAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.activityTypes = payload.data;
      state.totalTypeCount = payload.totalCount;
    });
    builder.addCase(getUsersActivityTypesAsync.rejected, (state) => {
      state.loading = false;
      state.activityTypes = [];
      state.totalTypeCount = 0;
    });
    builder.addCase(logoutAnyUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAnyUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteUsersActivityAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUsersActivityAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deactivateUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deactivateUserAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchAllAdminsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllAdminsAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allAdminUsers = payload.data;
    });
    builder.addCase(fetchAllAdminsAsync.rejected, (state) => {
      state.loading = false;
      state.allAdminUsers = [];
    });
    builder.addCase(updateAdminAccessAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAdminAccessAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateAccessUserAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAccessUserAsync.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { handleViewDetail } = dashboardSlice.actions;
export const getAllDashboardDetail = (state) => state.dashboard;

export default dashboardSlice.reducer;
