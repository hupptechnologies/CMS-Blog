import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../../pages/notification';
import { fetchCategories, addCategory, deleteCategory } from '../../service/category';

export const fetchCategoriesAsync = createAsyncThunk(
  'category/fetchCategories',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await fetchCategories(params, user, token);
      if (response.data) {
        const { categories, pagination, categoriesStatus, totalCount } = response.data;
        return fulfillWithValue({
          categories,
          pagination,
          categoriesStatus,
          totalCount
        });
      }
      return fulfillWithValue({
        categories: [],
        pagination: {},
        categoriesStatus: [],
        totalCount: 0
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const createCategoryAsync = createAsyncThunk(
  'category/addCategory',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await addCategory(params, user, token);
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          showSuccessNotification(message);
          if (params.callback) {
            params.callback(success);
          }
        }
        return fulfillWithValue({});
      }
      return fulfillWithValue({});
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'category/deleteCategory',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await deleteCategory(params, user, token);
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          showSuccessNotification(message);
          if (params.callback) {
            params.callback(success);
          }
        }
        return fulfillWithValue({});
      }
      return fulfillWithValue({});
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);
