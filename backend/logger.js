const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      silent: true // This will prevent all console logs
    })
    // new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

module.exports = logger;