import { backendAPI } from './index';

export const createNewUser = ({ data }) => {
  const requestInstance = backendAPI();
  return requestInstance.post('signup', data);
};

export const loginExistingUser = ({ data }) => {
  const requestInstance = backendAPI();
  return requestInstance.post('login', data);
};

export const getUserProfile = ({ id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`profile?id=${id}`);
};

export const getAllUsers = ({ type, id, search, startDate, endDate }, token) => {
  const requestInstance = backendAPI(token);
  let url = `users?id=${id}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (type) {
    url += `&type=${type}`;
  }
  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }
  return requestInstance.get(url);
};

export const logoutLoggedInUser = ({ data: { id } }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`user/logout?id=${id}`);
};

export const updateUserProfile = ({ data }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.put(`profile?id=${data?.id}`, data);
};

export const updateUserWelcomeMessage = ({ id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.put(`user/welcome?id=${id}`);
};
