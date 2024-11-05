export const ConfigCloudnary = {
  url: 'https://api.cloudinary.com/v1_1/dx12uvyye/',
  preset: 'Test_preset',
  cloudName: 'dx12uvyye',
  apiKey: '344972316838632',
  apiSecret: 'W3EbS2M2MtEUtH7Dng6PEtDYlRk',
  envVariable: 'CLOUDINARY_URL=cloudinary://344972316838632:W3EbS2M2MtEUtH7Dng6PEtDYlRk@dx12uvyye'
};

export const API_URL = 'http://192.168.1.64:3008/api/';

export const dummyUser = {
  username: 'eve.holt',
  password: 'username3pass'
};

export const googleAnalyticConfigs = {
  STREAM_NAME: 'cms',
  STREAM_URL: 'https://192.168.1.64:3000',
  STREAM_ID: '8531453273',
  MEASUREMENT_ID: 'G-3GV4XX6C8V'
};

export const getFlagURl = (countryCode) =>
  `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;
