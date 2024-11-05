import { backendAPI } from './index';

export const fetchCategories = ({ page, limit, data }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`get-categories?id=${id}&page=${page}&limit=${limit}`, data);
};

export const addCategory = ({ data }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`categories?id=${id}`, data);
};

export const deleteCategory = ({ catId }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.delete(`categories?id=${id}&catId=${catId}`);
};
