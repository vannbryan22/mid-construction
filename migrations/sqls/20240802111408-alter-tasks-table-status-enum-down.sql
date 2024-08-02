DO $$
BEGIN
    -- Revert column type to text
    ALTER TABLE tasks
        ALTER COLUMN status TYPE text
        USING status::text;

    -- Drop the ENUM type if it exists
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        DROP TYPE task_status;
    END IF;
END $$;
