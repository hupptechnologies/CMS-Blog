import { createAsyncThunk } from '@reduxjs/toolkit';
import { showErrorNotification, showSuccessNotification } from '../../pages/notification';
import {
  uploadPresetForBlog,
  fetchAllBlogs,
  likeBlog,
  viewBlog,
  createBlogPost,
  updateBlogStatus,
  getAllComments,
  createComment,
  createReplies,
  updateBlogPost
} from '../../service/blog';

export const uploadPresetForBlogAsync = createAsyncThunk(
  'blog/uploadPreset',
  async(params, { fulfillWithValue }) => {
    try {
      const response = await uploadPresetForBlog(params);
      if (response.data) {
        return fulfillWithValue({
          data: response.data
        });
      }
      return fulfillWithValue({
        data: []
      });
    } catch (err) {
      console.error(err);
    }
  }
);

export const createBlogPostAsync = createAsyncThunk(
  'blog/create',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await createBlogPost(params, token);
      if (response.data) {
        const { success } = response.data;
        if (success) {
          params.callback(success);
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

export const fetchAllBlogsAsync = createAsyncThunk(
  'blog/getAllBlogs',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await fetchAllBlogs(params, token);
      if (response.data) {
        const { blogs, blogStatusCounts, totalCount, pagination } = response.data;
        return fulfillWithValue({
          data: blogs,
          blogStatusCounts,
          totalCount,
          pagination
        });
      }
      return fulfillWithValue({
        data: [],
        blogStatusCounts: [],
        totalCount: 0,
        pagination: {}
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const likeCurrentBlogAsync = createAsyncThunk(
  'blog/likeBlog',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await likeBlog(params, token);
      if (response.data) {
        if (params.callback) {
          params.callback(response.data);
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

export const viewCurrentBlogAsync = createAsyncThunk(
  'blog/viewBlog',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await viewBlog(params, token);
      if (response.data) {
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      console.log(err);
      return rejectWithValue();
    }
  }
);

export const updateBlogStatusAsync = createAsyncThunk(
  'blog/updateStatus',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await updateBlogStatus(params, token);
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

export const getAllCommentsAsync = createAsyncThunk(
  'blog/getComments',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await getAllComments(params, token);
      if (response.data) {
        const { comments } = response.data;
        return fulfillWithValue({ data: comments });
      }
      return fulfillWithValue({
        data: []
      });
    } catch (err) {
      const { message } = err.response.data;
      showErrorNotification(message);
      return rejectWithValue();
    }
  }
);

export const createCommentAsync = createAsyncThunk(
  'blog/createComments',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await createComment(params, token);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
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

export const createRepliesAsync = createAsyncThunk(
  'blog/createReplies',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token } = state.auth;
      const response = await createReplies(params, token);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
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

export const updateBlogPostAsync = createAsyncThunk(
  'blog/update',
  async(params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { token, user } = state.auth;
      const response = await updateBlogPost(params, user, token);
      if (response.data) {
        const { success } = response.data;
        if (success) {
          params.callback(success);
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
