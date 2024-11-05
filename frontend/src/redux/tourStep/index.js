import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification } from '../../pages/notification';
import { fetchTourSteps } from '../../service/tourStep';

export const fetchTourStepsAsync = createAsyncThunk(
  'tourStep/fetchTourSteps',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      if (user) {
        const response = await fetchTourSteps(user, token);
        if (response.data) {
          const { tourStepsList } = response.data;
          return fulfillWithValue({
            data: tourStepsList
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
