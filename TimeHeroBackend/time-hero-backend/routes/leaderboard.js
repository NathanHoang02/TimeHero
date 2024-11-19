const express = require('express');
const router = express.Router();
const LeaderboardModel = require('../models/leaderboardModel');
const UserModel = require('../models/userModel');

router.post('/:userId/join', async (req, res) => {
    try {
        const { userId } = req.params;
        const { leaderboardId } = req.body;
        await UserModel.joinLeaderboard(userId, leaderboardId);
        res.json({ message: 'Joined leaderboard successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:leaderboardId', async (req, res) => {
    try {
        const { leaderboardId } = req.params;
        const leaderboardData = await LeaderboardModel.getLeaderboard(leaderboardId);
        res.json(leaderboardData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
