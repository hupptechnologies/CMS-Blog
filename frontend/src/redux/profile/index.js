import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../../pages/notification';
import { getUserProfile, getAllUsers, updateUserProfile } from '../../service/auth';

export const getUserProfileAsync = createAsyncThunk(
  'profile/getUserProfile',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await getUserProfile(params, token);
      if (response.data) {
        const { user } = response.data;
        return fulfillWithValue({
          data: user
        });
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

export const getAllUsersAsync = createAsyncThunk(
  'profile/getAllUsers',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await getAllUsers(params, token);
      if (response.data) {
        const { users, userTypes, totalCount } = response.data;
        return fulfillWithValue({
          data: users,
          userTypes,
          totalCount
        });
      }
      return fulfillWithValue({
        data: [],
        userTypes: [],
        totalCount: 0
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  'profile/updateUserProfile',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await updateUserProfile(params, token);
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
