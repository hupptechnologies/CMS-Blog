export const ConfigCloudnary = {
  url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/`,
  preset: process.env.REACT_APP_PRESET,
  cloudName: process.env.REACT_APP_CLOUDNAME,
  apiKey: process.env.REACT_APP_API_KEY,
  apiSecret: process.env.REACT_APP_API_SECRET,
};

export const API_URL = process.env.REACT_APP_API_URL;

export const dummyUser = {
  username: 'eve.holt',
  password: 'username3pass'
};

export const googleAnalyticConfigs = {
  MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID
};

export const getFlagURl = (countryCode) =>
  `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;
