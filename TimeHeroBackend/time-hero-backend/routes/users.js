const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// Get completed tasks for a user
router.get('/:userId/completed', async (req, res) => {
    try {
        const { userId } = req.params;
        const completedTasks = await UserModel.getCompletedTasks(userId);
        res.json({ completedTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user information
router.get('/:userId/info', async (req, res) => {
    try {
        const { userId } = req.params;
        const userInfo = await UserModel.getUserInfo(userId);
        if (userInfo) {
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get earned screen time for a user
router.get('/:userId/earned-time', async (req, res) => {
    try {
        const { userId } = req.params;
        const earnedTime = await UserModel.getEarnedScreenTime(userId);
        res.json({ earnedTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update earned screen time for a user
router.put('/:userId/earned-time', async (req, res) => {
    try {
        const { userId } = req.params;
        const { newTime } = req.body; // Expecting newTime in the request body
        if (newTime === undefined) {
            return res.status(400).json({ error: 'newTime is required' });
        }
        const changes = await UserModel.updateEarnedScreenTime(userId, newTime);
        if (changes) {
            res.json({ message: 'Screen time updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update completed tasks for a user
router.put('/:userId/completed', async (req, res) => {
    try {
        const { userId } = req.params;
        const { taskIds } = req.body; // Expecting taskIds as an array in the request body
        if (!Array.isArray(taskIds)) {
            return res.status(400).json({ error: 'taskIds must be an array' });
        }
        const changes = await UserModel.updateCompletedTasks(userId, taskIds);
        if (changes) {
            res.json({ message: 'Completed tasks updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Join a leaderboard
router.put('/:userId/join-leaderboard', async (req, res) => {
    try {
        const { userId } = req.params;
        const { leaderboardId } = req.body; // Expecting leaderboardId in the request body
        if (!leaderboardId) {
            return res.status(400).json({ error: 'leaderboardId is required' });
        }
        const changes = await UserModel.joinLeaderboard(userId, leaderboardId);
        if (changes) {
            res.json({ message: 'Joined leaderboard successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get username for a user
router.get('/:userId/username', async (req, res) => {
    try {
        const { userId } = req.params;
        const userInfo = await UserModel.getUserInfo(userId);
        if (userInfo && userInfo.username) {
            res.json({ username: userInfo.username });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update username for a user
router.put('/:userId/username', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username } = req.body; // Expecting username in the request body
        if (!username) {
            return res.status(400).json({ error: 'username is required' });
        }
        const changes = await UserModel.updateUsername(userId, username);
        if (changes) {
            res.json({ message: 'Username updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

