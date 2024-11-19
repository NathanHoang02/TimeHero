-- Create User table
CREATE TABLE User (
    id TEXT PRIMARY KEY,                  -- GUID for the user
    completedTaskIDs TEXT,                -- JSON array of completed task GUIDs
    accumulatedTime INTEGER NOT NULL,     -- Accumulated screen time
    depositedTime INTEGER NOT NULL,       -- Deposited time
    leaderboardID TEXT,                   -- References Leaderboard(id) or NULL
    activeTaskIDs TEXT,                   -- JSON array of active task GUIDs
    FOREIGN KEY (leaderboardID) REFERENCES Leaderboard(id)
);

-- Create Task table
CREATE TABLE Task (
    id TEXT PRIMARY KEY,                  -- GUID for the task
    time INTEGER,                         -- Time in seconds (nullable)
    metric INTEGER,                       -- Task metric value (nullable)
    completionType TEXT,                  -- Enum type handled server-side
    label TEXT NOT NULL,                  -- Task label
    steps TEXT,                           -- JSON array of strings for task steps
    taskType TEXT NOT NULL                -- Type of task as a string
);

-- Create Leaderboard table
CREATE TABLE Leaderboard (
    id TEXT PRIMARY KEY,                  -- GUID for the leaderboard
    joinCode TEXT NOT NULL UNIQUE,        -- Unique 6-digit alphanumeric code
    users TEXT                            -- JSON array of user GUIDs
);

-- Optional: Sample indices for faster queries
CREATE INDEX idx_user_leaderboardID ON User (leaderboardID);
CREATE INDEX idx_task_completionType ON Task (completionType);
