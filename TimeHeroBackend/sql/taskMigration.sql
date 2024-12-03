-- Insert tasks into the Task table
INSERT INTO Task (id, time, metric, completionType, label, steps, taskType)
VALUES
    -- Physical Health & Fitness
    ('task_001', 1200, NULL, 'timer', '20-minute yoga session', '["Find a yoga video", "Follow along"]', 'Physical Fitness'),
    ('task_002', 900, NULL, 'timer', '15 minutes of jump rope', '["Grab your jump rope", "Set a timer"]', 'Physical Fitness'),
    ('task_003', 1800, 10000, 'counter', 'Walk 10,000 steps', '["Track steps on a pedometer or phone"]', 'Physical Fitness'),
    ('task_004', 1200, NULL, 'timer', 'Quick bodyweight workout', '["Do planks, lunges, squats, and pushups"]', 'Physical Fitness'),
    ('task_005', 300, NULL, 'self-verified', 'Practice deep breathing', '["Set a timer", "Focus on slow breaths"]', 'Mental Health'),
    ('task_006', 900, NULL, 'timer', '15 minutes of balance training', '["Practice standing on one foot", "Use a stability ball if available"]', 'Physical Fitness'),
    ('task_007', 1800, NULL, 'timer', 'Go for a 30-minute bike ride or run', '["Wear safety gear", "Track the time"]', 'Physical Fitness'),
    ('task_008', 600, NULL, 'self-verified', 'Learn a new dance move', '["Find a dance video or tutorial"]', 'Physical Fitness'),
    ('task_034', NULL, 500, 'counter', 'Walk 500 steps', '["Use a pedometer or fitness app to track your steps"]', 'Physical Fitness'),
    ('task_038', 900, NULL, 'self-verified', 'Follow a daily stretching video', '["Find a stretching video", "Follow the routine for 15 minutes"]', 'Physical Fitness'),
    ('task_040', NULL, 30, 'counter', 'Do 30 pushups', '["Perform pushups in sets until you reach 30"]', 'Physical Fitness'),

    -- Mental Health & Mindfulness
    ('task_009', 600, NULL, 'self-verified', 'Spend 10 minutes journaling', '["Write about gratitude or reflection"]', 'Mental Health'),
    ('task_010', 600, NULL, 'timer', 'Practice a guided meditation', '["Choose a meditation app or video"]', 'Mental Health'),
    ('task_011', 1200, NULL, 'self-verified', 'Create a vision board for your goals', '["Gather materials", "Assemble the board"]', 'Mental Health'),

    -- Education & Skill Development
    ('task_012', 1800, NULL, 'timer', 'Watch an educational video', '["Find a TED Talk or documentary"]', 'Education'),
    ('task_013', 3600, NULL, 'timer', 'Work on a new skill', '["Choose a topic", "Practice for an hour"]', 'Education'),
    ('task_014', 1200, 5, 'counter', 'Learn 5 new vocabulary words', '["Pick words", "Write their meanings"]', 'Education'),
    ('task_015', 1200, NULL, 'timer', 'Read a nonfiction book for 20 minutes', '["Choose a book", "Set a timer"]', 'Education'),
    ('task_016', 1800, NULL, 'timer', 'Solve a puzzle', '["Find a crossword or Sudoku"]', 'Education'),
    ('task_030', 1800, NULL, 'timer', '30 minutes of school work', '["Set a timer for 30 minutes", "Focus on assignments or study material"]', 'Education'),
    ('task_031', 2700, NULL, 'timer', '45 minutes of school work', '["Set a timer for 45 minutes", "Focus on assignments or study material"]', 'Education'),
    ('task_032', 3600, NULL, 'timer', '1 hour of school work', '["Set a timer for 1 hour", "Focus on assignments or study material"]', 'Education'),
    ('task_035', 1200, NULL, 'self-verified', 'Do some reading (pages or hours)', '["Pick a book", "Track pages or time spent"]', 'Education'),
    ('task_036', 1200, NULL, 'self-verified', 'Two-step process: Find a book', '["Identify a book you want to read", "Locate it in your collection or online"]', 'Education'),
    ('task_037', 1200, NULL, 'self-verified', 'Two-step process: Do reading', '["Read the book", "Track pages or time spent reading"]', 'Education'),

    -- Household & Organization
    ('task_017', 900, NULL, 'self-verified', 'Declutter one drawer', '["Pick a drawer", "Sort and organize"]', 'Household'),
    ('task_018', 600, NULL, 'self-verified', 'Clean and organize your workspace', '["Clear desk", "Arrange items neatly"]', 'Household'),
    ('task_019', 1200, NULL, 'self-verified', 'Create a meal plan for the week', '["Plan meals", "Write ingredients"]', 'Household'),
    ('task_020', 1800, NULL, 'timer', 'Batch cook meals for 3 days', '["Prepare ingredients", "Cook meals"]', 'Household'),
    ('task_039', 1800, NULL, 'timer', '30 minutes of house cleaning', '["Pick an area to clean", "Set a timer and clean for 30 minutes"]', 'Household'),

    -- Creativity & Hobbies
    ('task_021', 1800, NULL, 'timer', 'Start a DIY project', '["Choose a project", "Work on it"]', 'Creativity'),
    ('task_022', 600, NULL, 'self-verified', 'Take photos of nature', '["Find a scenic spot", "Take photos"]', 'Creativity'),
    ('task_023', 1800, NULL, 'timer', 'Write a short story or poem', '["Draft an idea", "Write it"]', 'Creativity'),

    -- Social & Interpersonal
    ('task_024', 600, NULL, 'self-verified', 'Call a friend or family member', '["Dial their number", "Have a meaningful chat"]', 'Social'),
    ('task_025', 900, NULL, 'self-verified', 'Write a letter or email to someone', '["Choose a recipient", "Write the letter"]', 'Social'),
    ('task_026', 600, NULL, 'self-verified', 'Brainstorm ways to help others', '["List ideas to help in your community"]', 'Social'),

    -- Outdoor & Nature
    ('task_027', 600, NULL, 'self-verified', 'Spend 15 minutes gardening', '["Water plants", "Pull weeds"]', 'Outdoor'),
    ('task_028', 1200, NULL, 'timer', 'Visit a park and explore a trail', '["Plan a route", "Enjoy the walk"]', 'Outdoor'),
    ('task_033', 1800, NULL, 'timer', '30 minutes outside', '["Spend time outdoors", "Take a walk or enjoy fresh air"]', 'Outdoor'),
    ('task_029', 600, NULL, 'self-verified', 'Sit quietly in nature for 10 minutes', '["Find a spot", "Observe the sounds and sights"]', 'Outdoor');
