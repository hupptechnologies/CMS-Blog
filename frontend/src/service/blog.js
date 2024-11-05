import { backendAPI, cloudnaryRequestInstance } from './index';

export const uploadPresetForBlog = ({ data }) => {
  const requestInstance = cloudnaryRequestInstance();
  return requestInstance.post('image/upload', data);
};

export const createBlogPost = ({ data, status }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`create/blog?status=${status}`, data);
};

export const fetchAllBlogs = ({ data, page, limit }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`blogs?page=${page}&limit=${limit}`, data);
};

export const likeBlog = (params, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post('blog/like', params);
};

export const viewBlog = (params, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post('blog/view', params);
};

export const updateBlogStatus = ({ data }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.put('blog', data);
};

export const getAllComments = ({ blogId }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`comment/blog?blogId=${blogId}`);
};

export const createComment = ({ data }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post('comments', data);
};

export const createReplies = ({ data }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post('reply', data);
};

export const updateBlogPost = ({ data }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.put(`updateBlog?id=${id}`, data);
};
