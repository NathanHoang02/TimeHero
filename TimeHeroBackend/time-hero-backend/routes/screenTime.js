const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

router.get('/:userId/earned', async (req, res) => {
    try {
        const { userId } = req.params;
        const earnedTime = await UserModel.getEarnedScreenTime(userId);
        res.json({ earnedTime });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:userId/earned', async (req, res) => {
    try {
        const { userId } = req.params;
        const { newTime } = req.body;
        await UserModel.updateEarnedScreenTime(userId, newTime);
        res.json({ message: 'Screen time updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
