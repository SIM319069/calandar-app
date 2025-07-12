-- Create user first
CREATE USER calendar_user WITH PASSWORD 'calendar_pass';

-- Create database
CREATE DATABASE calendar_db OWNER calendar_user;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE calendar_db TO calendar_user;

-- Connect to the calendar_db
\c calendar_db;

-- Now create the table as the calendar_user
SET ROLE calendar_user;

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    priority INTEGER DEFAULT 1 CHECK (priority >= 1 AND priority <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_priority ON events(priority);

-- Grant permissions on the table
GRANT ALL PRIVILEGES ON TABLE events TO calendar_user;
GRANT ALL PRIVILEGES ON SEQUENCE events_id_seq TO calendar_user;