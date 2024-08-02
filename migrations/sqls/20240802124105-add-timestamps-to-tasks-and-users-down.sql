DO $$ BEGIN
    -- Remove created_at and updated_at from tasks table
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'tasks' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE tasks
        DROP COLUMN created_at,
        DROP COLUMN updated_at;
    END IF;

    -- Remove created_at and updated_at from users table
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'users' AND column_name = 'created_at'
    ) THEN
        ALTER TABLE users
        DROP COLUMN created_at,
        DROP COLUMN updated_at;
    END IF;
END $$;
