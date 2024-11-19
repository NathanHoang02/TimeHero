const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

router.get('/:userId/completed', async (req, res) => {
    try {
        const { userId } = req.params;
        const completedTasks = await UserModel.getCompletedTasks(userId);
        res.json({ completedTasks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

module.exports = router;
