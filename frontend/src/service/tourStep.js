import { backendAPI } from './index';

export const fetchTourSteps = ({ id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`tourStep?id=${id}`);
};
