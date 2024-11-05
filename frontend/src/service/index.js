import axios from 'axios';
import { API_URL, ConfigCloudnary } from '../utils/configs';

export const cloudnaryRequestInstance = () => {
  return axios.create({
    baseURL: ConfigCloudnary.url
  });
};

export const backendAPI = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
