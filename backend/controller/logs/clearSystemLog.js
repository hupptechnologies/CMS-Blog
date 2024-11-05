const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs/app.log');

const clearLogFile = async () => {
  try {
    await fs.promises.truncate(logFilePath, 0);
    console.log('Log file cleared successfully.');
  } catch (error) {
    console.error('Error clearing log file:', error.message);
  }
};

module.exports = clearLogFile;
