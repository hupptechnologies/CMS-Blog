import { createSlice } from '@reduxjs/toolkit';
import {
  createBlogPostAsync,
  createCommentAsync,
  createRepliesAsync,
  fetchAllBlogsAsync,
  getAllCommentsAsync,
  likeCurrentBlogAsync,
  updateBlogPostAsync,
  updateBlogStatusAsync,
  uploadPresetForBlogAsync,
  viewCurrentBlogAsync
} from './index';

const initialState = {
  blogPosts: [],
  loading: false,
  commentLoading: false,
  blogLoading: false,
  imageObj: {},
  blogStatusCounts: [],
  totalCount: 0,
  comments: [],
  pagination: {}
};

const blogSlice = createSlice({
  name: 'blogList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadPresetForBlogAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadPresetForBlogAsync.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.imageObj = payload.data;
    });
    builder.addCase(uploadPresetForBlogAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createBlogPostAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBlogPostAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchAllBlogsAsync.pending, (state) => {
      state.blogLoading = true;
    });
    builder.addCase(fetchAllBlogsAsync.fulfilled, (state, { payload }) => {
      state.blogLoading = false;
      state.blogPosts = payload.data;
      state.blogStatusCounts = payload.blogStatusCounts;
      state.totalCount = payload.totalCount;
      state.pagination = payload.pagination;
    });
    builder.addCase(fetchAllBlogsAsync.rejected, (state) => {
      state.blogLoading = false;
      state.blogPosts = [];
      state.blogStatusCounts = [];
      state.totalCount = 0;
      state.pagination = {};
    });
    builder.addCase(likeCurrentBlogAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(likeCurrentBlogAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(viewCurrentBlogAsync.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(viewCurrentBlogAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBlogStatusAsync.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBlogStatusAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllCommentsAsync.pending, (state) => {
      state.commentLoading = true;
    });
    builder.addCase(getAllCommentsAsync.fulfilled, (state, { payload }) => {
      state.commentLoading = false;
      state.comments = payload.data;
    });
    builder.addCase(getAllCommentsAsync.rejected, (state) => {
      state.commentLoading = false;
    });
    builder.addCase(createCommentAsync.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(createCommentAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(createRepliesAsync.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(createRepliesAsync.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBlogPostAsync.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(updateBlogPostAsync.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const getAllBlogPosts = (state) => state.blogList;

export default blogSlice.reducer;
