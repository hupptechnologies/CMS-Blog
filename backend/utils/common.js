const timeFormatt = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };
  return date.toLocaleString("en-US", options);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const defaultAccessJson = {
  0: {
    page: true,
  },
  1: {
    page: true,
    actions: {
      edit: true,
    },
  },
  2: {
    page: true,
    actions: {
      date: true,
      delete: true,
      restore: true,
      logout: true,
      select: true,
      search: true,
    },
  },
  3: {
    page: true,
    actions: {
      add: true,
      date: true,
      select: true,
      delete: true,
      edit: true,
      archive: true,
      publish: true,
      search: true,
      pagination: true,
      schedule: true,
    },
  },
  4: {
    page: true,
    actions: {
      date: true,
      select: true,
      delete: true,
      pagination: true,
    },
  },
  5: {
    page: true,
    actions: {
      date: true,
      select: true,
      pagination: true,
      view: true,
    },
  },
  6: {
    page: true,
    actions: {
      select: true,
      pagination: true,
      add: true,
      edit: true,
      delete: true,
      search: true,
    },
  },
  7: {
    page: true,
    actions: {
      language: true,
    },
  },
};

module.exports = { timeFormatt, delay, defaultAccessJson };
