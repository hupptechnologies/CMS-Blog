import { createSlice } from '@reduxjs/toolkit';
import { fetchTourStepsAsync } from './index';

const initialState = {
  tourStepsList: [],
  loading: false
};

const tourStepSlice = createSlice({
  name: 'tourStep',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTourStepsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTourStepsAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tourStepsList = payload.data;
    });
    builder.addCase(fetchTourStepsAsync.rejected, (state) => {
      state.loading = false;
      state.tourStepsList = [];
    });
  }
});

export const getAllTourStepDetail = (state) => state.tourStep;

export default tourStepSlice.reducer;
