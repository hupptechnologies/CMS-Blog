const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to insert a log entry
const insertLogEntry = async (level, message, additional_info, created_at, updated_at) => {
  const client = await pool.connect();
  try {
    await client.query('SELECT public.insert_log_entry($1, $2, $3, $4, $5)', [
      level,
      message,
      additional_info,
      created_at,
      updated_at,
    ]);
  } catch (err) {
    console.error('Error inserting log entry:', err);
  } finally {
    client.release();
  }
};

module.exports = {
  insertLogEntry,
};

