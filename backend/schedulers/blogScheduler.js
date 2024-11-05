const cron = require("node-cron");
const updateBlogStatus = require("../functions/blogFunction");
const clearLogFile = require("../controller/logs/clearSystemLog");
const backupDatabase = require("../databaseBackup/backupScript");

const cronJob = () => {
  // Schedule the cron job to run every minute
  cron.schedule("* * * * *", () => {
    return;
    console.log("Running cron job to update blog statuses...");
    clearLogFile();
    // Now for stop this func
    updateBlogStatus();
  });

  // Schedule backup to run daily at 3 AM
  cron.schedule("0 3 * * *", () => {
    console.log("Starting database backup...");
    backupDatabase();
  });
};

module.exports = cronJob;
