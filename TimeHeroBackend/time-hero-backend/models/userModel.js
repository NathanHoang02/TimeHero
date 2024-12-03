const db = require('../config/db');

const User = {
  getEarnedScreenTime: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT accumulatedTime FROM User WHERE id = ?`;
      db.get(query, [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row ? row.accumulatedTime : 0);
      });
    });
  },

  updateEarnedScreenTime: (userId, newTime) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE User SET accumulatedTime = ? WHERE id = ?`;
      db.run(query, [newTime, userId], function (err) {
        if (err) return reject(err);
        resolve(this.changes); // Returns the number of rows affected
      });
    });
  },

  getCompletedTasks: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT completedTaskIDs FROM User WHERE id = ?`;
      db.get(query, [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row ? JSON.parse(row.completedTaskIDs) : []);
      });
    });
  },

  updateCompletedTasks: (userId, taskIds) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE User SET completedTaskIDs = ? WHERE id = ?`;
      db.run(query, [JSON.stringify(taskIds), userId], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  },

  joinLeaderboard: (userId, leaderboardId) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE User SET leaderboardID = ? WHERE id = ?`;
      db.run(query, [leaderboardId, userId], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  },

  getUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT id, username, completedTaskIDs, accumulatedTime, depositedTime, leaderboardID, activeTaskIDs FROM User WHERE id = ?`;
      db.get(query, [userId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  createUser: (user) => {
    return new Promise((resolve, reject) => {
      const { id, username, completedTaskIDs, accumulatedTime, depositedTime, leaderboardID, activeTaskIDs } = user;
      const query = `INSERT INTO User (id, username, completedTaskIDs, accumulatedTime, depositedTime, leaderboardID, activeTaskIDs) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.run(
        query,
        [
          id,
          username,
          JSON.stringify(completedTaskIDs || []),
          accumulatedTime,
          depositedTime,
          leaderboardID,
          JSON.stringify(activeTaskIDs || []),
        ],
        function (err) {
          if (err) return reject(err);
          resolve(this.lastID); // Returns the inserted row ID
        }
      );
    });
  },

  updateUsername: (userId, username) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE User SET username = ? WHERE id = ?`;
      db.run(query, [username, userId], function (err) {
        if (err) return reject(err);
        resolve(this.changes); // Returns the number of rows affected
      });
    });
  },
};

module.exports = User;
