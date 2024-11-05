import { backendAPI } from './index';

export const fetchAPILogs = (
  { page, limit, data: { type, startDate, endDate }},
  { id },
  token
) => {
  const requestInstance = backendAPI(token);
  let url = `logs?id=${id}&page=${page}&limit=${limit}`;
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
