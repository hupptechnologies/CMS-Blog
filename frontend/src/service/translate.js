import { backendAPI } from './index';

export const fetchTranslations = ({ data: { type = '', language = '' }}, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.get(`translate?id=${id}&type=${type}&language=${language}`);
};

export const updateTranslations = ({ data }, { id }, token) => {
  const requestInstance = backendAPI(token);
  return requestInstance.post(`translate?id=${id}`, data);
};
