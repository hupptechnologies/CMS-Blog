import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification } from '../../pages/notification';
import { fetchAPILogs } from '../../service/log';

export const fetchAPIsLogsAsync = createAsyncThunk(
  'log/fetchAPILogs',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await fetchAPILogs(params, user, token);
      if (response.data) {
        const { logs, pagination, logStatus, totalCount } = response.data;
        return fulfillWithValue({
          data: logs,
          pagination,
          logStatus,
          totalCount
        });
      }
      return fulfillWithValue({
        data: [],
        pagination: {},
        logStatus: [],
        totalCount: 0
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);
