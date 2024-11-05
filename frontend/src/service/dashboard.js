import { backendAPI } from './index';

export const getUsersStatistics = ({ id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`user/statistic?id=${id}`);
};

export const getUsersActivities = ({ data, page, limit }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`user/activity?id=${id}&page=${page}&limit=${limit}`, data);
};

export const getUsersActivityTypes = ({ startDate, endDate }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(
    `user/activityTypes?id=${id}&startDate=${startDate}&endDate=${endDate}`
  );
};

export const logoutAnyUser = ({ message }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`send-notification?id=${id}`, message);
};

export const deleteUsersActivity = ({ activityId }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.delete(`user/activity?id=${id}&activityId=${activityId}`);
};

export const deactivateUser = ({ type, userId }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.delete(`user?id=${id}&type=${type}&userId=${userId}`);
};

export const fetchAllAdmins = ({ id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`admins?id=${id}`);
};

export const updateAdminAccess = ({ data }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.put(`userAccess?id=${id}`, data);
};
