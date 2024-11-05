import { createAsyncThunk } from '@reduxjs/toolkit';
import { showSuccessNotification, showErrorNotification } from '../../pages/notification';
import {
  createNewUser,
  loginExistingUser,
  logoutLoggedInUser,
  updateUserWelcomeMessage
} from '../../service/auth';

export const createNewUserAsync = createAsyncThunk(
  'auth/createUser',
  async(params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await createNewUser(params);
      if (response.data) {
        const { success, newUser, message } = response.data;
        if (success) {
          showSuccessNotification(message);
        }
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue({
          data: newUser
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

export const loginExistingUserAsync = createAsyncThunk(
  'auth/loginUser',
  async(params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await loginExistingUser(params);
      if (response.data) {
        const { token, success, message, user } = response.data;
        const role = user?.role;
        if (success && role !== 'user') {
          showSuccessNotification(message);
        }
        if (params.callback) {
          params.callback(success, role);
        }
        return fulfillWithValue({
          token,
          user
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

export const logoutLoggedInUserAsync = createAsyncThunk(
  'auth/logoutUser',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await logoutLoggedInUser(params, token);
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

export const updateUserWelcomeMessageAsync = createAsyncThunk(
  'auth/updateUserWelcomeMessage',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await updateUserWelcomeMessage(user, token);
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
