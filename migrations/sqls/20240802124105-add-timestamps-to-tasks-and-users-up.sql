DO $$ BEGIN
    -- Add created_at and updated_at to tasks table
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tasks' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE tasks
        ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
    END IF;

    -- Add created_at and updated_at to users table
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE users
        ADD COLUMN created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        ADD COLUMN updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;
