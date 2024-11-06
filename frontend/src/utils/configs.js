export const ConfigCloudnary = {
  url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDNAME}/`,
  preset: process.env.REACT_APP_PRESET,
  cloudName: process.env.REACT_APP_CLOUDNAME,
  apiKey: process.env.REACT_APP_API_KEY,
  apiSecret: process.env.REACT_APP_API_SECRET,
  envVariable: `CLOUDINARY_URL=cloudinary://${process.env.REACT_APP_API_KEY}:${process.env.REACT_APP_API_SECRET}@${process.env.REACT_APP_CLOUDNAME}`
};

export const API_URL = process.env.REACT_APP_API_URL;

export const dummyUser = {
  username: 'eve.holt',
  password: 'username3pass'
};

export const googleAnalyticConfigs = {
  STREAM_NAME: process.env.REACT_APP_STREAM_NAME,
  STREAM_URL: process.env.REACT_APP_STREAM_URL,
  STREAM_ID: process.env.REACT_APP_STREAM_ID,
  MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID
};

export const getFlagURl = (countryCode) =>
  `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;


// # Cloudinary Credentials
// REACT_APP_CLOUDNAME=dx12uvyye
// REACT_APP_PRESET=Test_preset
// REACT_APP_API_KEY=344972316838632
// REACT_APP_API_SECRET=W3EbS2M2MtEUtH7Dng6PEtDYlRk

// # Google Analytics Config
// REACT_APP_STREAM_NAME=cms
// REACT_APP_STREAM_URL=https://192.168.1.64:3000
// REACT_APP_STREAM_ID=8531453273
// REACT_APP_MEASUREMENT_ID=G-3GV4XX6C8V