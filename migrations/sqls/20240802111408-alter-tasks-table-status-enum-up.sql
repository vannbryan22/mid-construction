ALTER TABLE tasks
    ALTER COLUMN status DROP DEFAULT;

-- Create an ENUM type for task status if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('To Do', 'In Progress', 'Done');
    END IF;
END $$;

-- Alter the tasks table to use the new ENUM type for status
ALTER TABLE tasks
    ALTER COLUMN status TYPE task_status
    USING status::task_status;
