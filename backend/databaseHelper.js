const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
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


// USE INSERT_LG_ENTRY FUNC IN DB ADD

// -- DROP FUNCTION public.insert_log_entry(varchar, text, jsonb, timestamptz, timestamptz);

// CREATE OR REPLACE FUNCTION public.insert_log_entry(p_level character varying, p_message text, p_additional_info jsonb, p_created_at timestamp with time zone, p_updated_at timestamp with time zone)
//  RETURNS void
//  LANGUAGE plpgsql
// AS $function$
// DECLARE
//     partition_start DATE;
//     partition_end DATE;
//     partition_name TEXT;
// BEGIN
//     -- Determine the start and end dates for the month of the provided created_at date
//     partition_start := DATE_TRUNC('month', p_created_at);
//     partition_end := partition_start + INTERVAL '1 month';
//     partition_name := format('log_%s', to_char(partition_start, 'YYYY_MM'));

//     -- Check if the partition for the month exists
//     IF NOT EXISTS (
//         SELECT 1
//         FROM pg_class
//         WHERE relname = partition_name
//     ) THEN
//         -- Create the partition for the month if it does not exist
//         EXECUTE format(
//             'CREATE TABLE %I PARTITION OF log FOR VALUES FROM (%L) TO (%L)',
//             partition_name,
//             partition_start,
//             partition_end
//         );
//     END IF;

//     -- Insert the data into the appropriate partition
//     EXECUTE format(
//         'INSERT INTO %I (level, message, additional_info, created_at, updated_at)
//          VALUES (%L, %L, %L, %L, %L)',
//         partition_name,
//         p_level,
//         p_message,
//         p_additional_info,
//         p_created_at,
//         p_updated_at
//     );
// END $function$
// ;
