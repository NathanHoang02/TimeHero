-- Insert dummy data into the User table
-- Insert dummy data into Leaderboard table
INSERT INTO Leaderboard (id, joinCode, users)
VALUES
    ('leaderboard_001', 'ABC123', '["user_001", "user_002", "user_003"]'),
    ('leaderboard_002', 'DEF456', '["user_004", "user_005"]');

-- Insert dummy data into User table
INSERT INTO User (id, username, completedTaskIDs, accumulatedTime, depositedTime, leaderboardID, activeTaskIDs)
VALUES
    ('user_001', 'Alice', '["task_001", "task_002", "task_030"]', 7200, 3600, 'leaderboard_001', '["task_012", "task_015"]'),
    ('user_002', 'Bob', '["task_003", "task_004", "task_032"]', 10800, 5400, 'leaderboard_001', '["task_016", "task_034"]'),
    ('user_003', 'Charlie', '["task_005", "task_006", "task_037"]', 5400, 2700, 'leaderboard_001', '["task_018", "task_024"]'),
    ('user_004', 'Diana', '["task_007", "task_008", "task_039"]', 3600, 1800, 'leaderboard_002', '["task_022", "task_028"]'),
    ('user_005', 'Eve', '["task_009", "task_010", "task_040"]', 4500, 2250, 'leaderboard_002', '["task_013", "task_035"]');
