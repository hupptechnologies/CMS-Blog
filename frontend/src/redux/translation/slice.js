import { createSlice } from '@reduxjs/toolkit';
import { fetchTranslationAsync, fetchTranslationTypesAsync, updateTranslationAsync } from './index';

const initialState = {
  translations: [],
  loading: false,
  languageTypes: [],
  totalCount: 0
};

const translateSlice = createSlice({
  name: 'translate',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTranslationAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTranslationAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.translations = payload.data;
    });
    builder.addCase(fetchTranslationAsync.rejected, (state) => {
      state.loading = false;
      state.translations = [];
    });
    builder.addCase(fetchTranslationTypesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTranslationTypesAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.languageTypes = payload.data;
      state.totalCount = payload.totalCount;
    });
    builder.addCase(fetchTranslationTypesAsync.rejected, (state) => {
      state.loading = false;
      state.languageTypes = [];
      state.totalCount = 0;
    });
    builder.addCase(updateTranslationAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTranslationAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.translations = payload.data;
    });
    builder.addCase(updateTranslationAsync.rejected, (state) => {
      state.loading = false;
      state.translations = [];
    });
  }
});

export const getAllTranslateDetail = (state) => state.translate;

export default translateSlice.reducer;
