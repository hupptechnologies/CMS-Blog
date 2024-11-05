export const formattedDate = (date) => {
  const newDate = new Date(date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return newDate.toLocaleString('en-US', options);
};

export const formattedDateForActivity = (date) => {
  const newDate = new Date(date);
  const dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const formattedDate = newDate.toLocaleDateString('en-US', dateOptions);
  const formattedTime = newDate.toLocaleTimeString('en-US', timeOptions);
  return `Date: ${formattedDate} Time: ${formattedTime}`;
};

export const formatViews = (views) => {
  if (views >= 1000) {
    const suffixes = ['K', 'M', 'B'];
    const suffixIndex = Math.floor(('' + views).length / 3) - 1;
    let shortValue = (views / Math.pow(1000, suffixIndex + 1)).toFixed(1);
    return `${shortValue} ${suffixes[suffixIndex]} views`;
  }
  return `${views} views`;
};

export const getActivityBackgroundColor = (activityType) => {
  const colorMap = {
    logout: '#FFDDDD',
    login: '#E0F7FA',
    like: '#E8F5E9',
    view: '#FFF9C4',
    signup: '#E1F5FE'
  };
  return colorMap[activityType] || '#FFFFFF';
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const timeFormatt = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
  };
  return date.toLocaleString('en-US', options);
};

export const errorStatus = (status) => {
  const errorsArray = [404, 400, 401, 403, 500];
  const successArray = [204, 200, 201];
  if (errorsArray.includes(status)) {
    return { bg: 'bg-red-100', text: 'text-red-800' };
  } else if (successArray.includes(status)) {
    return { bg: 'bg-green-100', text: 'text-green-800' };
  } else if (status === 304) {
    return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
  }
};

export const calculateTimePendingPercentage = (updated_at) => {
  const now = new Date().getTime();
  const updatedAtTime = new Date(updated_at).getTime();
  const elapsedTime = now - updatedAtTime;
  const totalDuration = 24 * 60 * 60 * 1000;
  const percentageUsed = Math.min((elapsedTime / totalDuration) * 100, 100);
  return percentageUsed.toFixed(0);
};

export const hasAccess = ({ pageNumber, actionName, access }) => {
  const page = access[pageNumber];
  if (!page) {
    return false;
  }
  if (!page.page) {
    return false;
  }
  if (actionName && !page.actions) {
    return false;
  }
  if (actionName && !page.actions[actionName]) {
    return false;
  }
  return true;
};
