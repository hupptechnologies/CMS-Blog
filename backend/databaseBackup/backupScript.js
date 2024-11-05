const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: process.env.DB_LOGGING === "true" ? true : false,
};

// Backup directory
const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

// Function to backup PostgreSQL database
const backupDatabase = () => {
  const date = new Date().toISOString().split('T')[0];
  const backupFile = path.join(backupDir, `backup-${date}.sql`);

  const dumpCommand = `PGPASSWORD=${config.password} pg_dump -U ${config.username} -h ${config.host} -d ${config.database} -F c -b -v -f ${backupFile}`;

  exec(dumpCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing command: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Backup completed: ${backupFile}`);
  });
}

module.exports = backupDatabase;
