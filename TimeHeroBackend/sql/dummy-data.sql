-- Insert dummy data into the User table
INSERT INTO User (id, completedTaskIDs, accumulatedTime, depositedTime, leaderboardID, activeTaskIDs)
VALUES 
('user1', '["task1", "task2"]', 120, 60, 'leaderboard1', '["task3", "task4"]'),
('user2', '["task3"]', 150, 80, 'leaderboard1', '["task5"]'),
('user3', '[]', 200, 100, NULL, '["task1"]');

-- Insert dummy data into the Task table
INSERT INTO Task (id, time, metric, completionType, label, steps, taskType)
VALUES 
('task1', 30, NULL, 'timer', 'Read for 30 minutes', '["Read", "Summarize"]', 'reading'),
('task2', NULL, 100, 'counter', 'Do 100 pushups', '["Pushups"]', 'exercise'),
('task3', 15, NULL, 'timer', 'Meditate for 15 minutes', '["Breathe", "Focus"]', 'meditation'),
('task4', NULL, 50, 'counter', 'Solve 50 math problems', '["Math problems"]', 'learning'),
('task5', 10, NULL, 'timer', 'Write for 10 minutes', '["Write journal"]', 'writing');

-- Insert dummy data into the Leaderboard table
INSERT INTO Leaderboard (id, joinCode, users)
VALUES 
('leaderboard1', 'ABC123', '["user1", "user2"]'),
('leaderboard2', 'DEF456', '["user3"]');
