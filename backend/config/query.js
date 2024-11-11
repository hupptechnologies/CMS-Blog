const createLogTableQuery = `
    -- Check if the 'log' table exists
    DO $$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_tables WHERE tablename = 'log') THEN
            -- Create the log table with partitioning
            CREATE TABLE log (
              id SERIAL,
              level VARCHAR(50) NOT NULL,
              message TEXT NOT NULL,
              additional_info JSONB DEFAULT '{}'::jsonb,
              created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
              PRIMARY KEY (id, created_at) -- Include created_at in the primary key
            ) PARTITION BY RANGE (created_at);

            RAISE NOTICE 'Log table created successfully with partitioning.';
        ELSE
            RAISE NOTICE 'Log table already exists, skipping creation.';
        END IF;
    END $$;
  `;

const checkLogTableExistQuery = `
  SELECT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_name = 'log'
  );
`
const createFunctionQuery = `
    CREATE OR REPLACE FUNCTION public.insert_log_entry(
        p_level character varying, 
        p_message text, 
        p_additional_info jsonb, 
        p_created_at timestamp with time zone, 
        p_updated_at timestamp with time zone
    )
    RETURNS void
    LANGUAGE plpgsql
    AS $function$
    DECLARE
        partition_start DATE;
        partition_end DATE;
        partition_name TEXT;
    BEGIN
    -- Determine the start and end dates for the month of the provided created_at date
    partition_start := DATE_TRUNC('month', p_created_at);
    partition_end := partition_start + INTERVAL '1 month';
    partition_name := format('log_%s', to_char(partition_start, 'YYYY_MM'));
    -- Check if the partition for the month exists
    IF NOT EXISTS (
        SELECT 1
        FROM pg_class
        WHERE relname = partition_name
    ) THEN
        -- Create the partition for the month if it does not exist
        EXECUTE format(
            'CREATE TABLE %I PARTITION OF log FOR VALUES FROM (%L) TO (%L)',
            partition_name,
            partition_start,
            partition_end
        );
    END IF;
        -- Insert the data into the appropriate partition
        EXECUTE format(
            'INSERT INTO %I (level, message, additional_info, created_at, updated_at)
            VALUES (%L, %L, %L, %L, %L)',
            partition_name,
            p_level,
            p_message,
            p_additional_info,
            p_created_at,
            p_updated_at
        );
    END;
    $function$;
`;

module.exports = { createFunctionQuery, createLogTableQuery, checkLogTableExistQuery };