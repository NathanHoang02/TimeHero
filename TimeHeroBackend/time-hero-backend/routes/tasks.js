const express = require('express');
const router = express.Router();
const TaskModel = require('../models/taskModel');
const UserModel = require('../models/userModel');

router.get('/available', async (req, res) => {
    try {
        const tasks = await TaskModel.getAvailableTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:userId/completed', async (req, res) => {
    try {
        const { userId } = req.params;
        const { taskIds } = req.body; // Expecting an array of task IDs
        await UserModel.updateCompletedTasks(userId, taskIds);
        res.json({ message: 'Completed tasks updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
