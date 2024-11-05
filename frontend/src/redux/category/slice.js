import { createSlice } from '@reduxjs/toolkit';
import { createCategoryAsync, deleteCategoryAsync, fetchCategoriesAsync } from './index';

const initialState = {
  categories: [],
  loading: false,
  pagination: {},
  categoriesStatus: [],
  total: 0
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.categories = payload.categories;
      state.pagination = payload.pagination;
      state.categoriesStatus = payload.categoriesStatus;
      state.total = payload.totalCount;
    });
    builder.addCase(fetchCategoriesAsync.rejected, (state) => {
      state.loading = false;
      state.categories = [];
      state.pagination = {};
      state.categoriesStatus = [];
    });
    builder.addCase(createCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCategoryAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAsync.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const getAllCategoriesDetail = (state) => state.category;

export default categorySlice.reducer;
