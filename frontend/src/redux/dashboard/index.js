import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../../pages/notification';
import {
  getUsersActivities,
  getUsersStatistics,
  getUsersActivityTypes,
  logoutAnyUser,
  deleteUsersActivity,
  deactivateUser,
  fetchAllAdmins,
  updateAdminAccess
} from '../../service/dashboard';

export const getUsersStatisticsAsync = createAsyncThunk(
  'dashboard/getUserStatistics',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await getUsersStatistics((params = user), token);
      if (response.data) {
        const { data } = response.data;
        return fulfillWithValue({ data });
      }
      return fulfillWithValue({
        data: {}
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const getUsersActivitiesAsync = createAsyncThunk(
  'dashboard/getUsersActivities',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await getUsersActivities(params, user, token);
      if (response.data) {
        const {
          activities,
          pagination: { totalPages, totalItems }
        } = response.data;
        return fulfillWithValue({ data: activities, totalPages, totalItems });
      }
      return fulfillWithValue({
        data: [],
        totalPages: 1,
        totalItems: 0
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const getUsersActivityTypesAsync = createAsyncThunk(
  'dashboard/getUsersActivityTypes',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await getUsersActivityTypes(params, user, token);
      if (response.data) {
        const { data, totalCount } = response.data;
        return fulfillWithValue({ data, totalCount });
      }
      return fulfillWithValue({
        data: [],
        totalCount: 0
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const logoutAnyUserAsync = createAsyncThunk(
  'dashboard/logoutAnyUser',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await logoutAnyUser(params, user, token);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const deleteUsersActivityAsync = createAsyncThunk(
  'dashboard/deleteUsersActivity',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await deleteUsersActivity(params, user, token);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const deactivateUserAsync = createAsyncThunk(
  'dashboard/deactivateUser',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await deactivateUser(params, user, token);
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          showSuccessNotification(message);
        }
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const fetchAllAdminsAsync = createAsyncThunk(
  'dashboard/fetchAllAdmins',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await fetchAllAdmins(user, token);
      if (response.data) {
        const { allAdminUsers } = response.data;
        return fulfillWithValue({
          data: allAdminUsers
        });
      }
      return fulfillWithValue({
        data: []
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const updateAdminAccessAsync = createAsyncThunk(
  'dashboard/updateAdminAccess',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await updateAdminAccess(params, user, token);
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          showSuccessNotification(message);
        }
        if (params.callback) {
          params.callback(success, params);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const updateAccessUserAsync = createAsyncThunk(
  'dashboard/updateAccess',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await logoutAnyUser(params, user, token);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);
