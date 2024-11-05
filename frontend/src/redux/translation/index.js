import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../../pages/notification';
import { fetchTranslations, updateTranslations } from '../../service/translate';

export const fetchTranslationAsync = createAsyncThunk(
  'translate/fetchTranslations',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      if (user) {
        const response = await fetchTranslations(params, user, token);
        if (response.data) {
          const { translation } = response.data;
          return fulfillWithValue({
            data: translation
          });
        }
        return fulfillWithValue({
          data: []
        });
      }
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const fetchTranslationTypesAsync = createAsyncThunk(
  'translate/fetchTranslationTypes',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await fetchTranslations(params, user, token);
      if (response.data) {
        const { languages, totalCount } = response.data;
        return fulfillWithValue({
          data: languages,
          totalCount
        });
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

export const updateTranslationAsync = createAsyncThunk(
  'translate/updateTranslations',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await updateTranslations(params, user, token);
      if (response.data) {
        const { translations, success, message } = response.data;
        if (success) {
          showSuccessNotification(message);
        }
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue({
          data: translations
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
