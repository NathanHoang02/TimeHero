const db = require("../config/db");
const { v4: uuidv4 } = require('uuid'); 

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

  joinLeaderboard: (userId, leaderboardJoinCode) => {
    return new Promise((resolve, reject) => {
      // First, try to find an existing leaderboard with the given join code
      const findLeaderboardQuery = `SELECT * FROM Leaderboard WHERE joinCode = ?`;
      db.get(
        findLeaderboardQuery,
        [leaderboardJoinCode],
        (err, leaderboard) => {
          if (err) return reject(err);

          if (leaderboard) {
            // If leaderboard is found, update the user's leaderboardID
            const updateUserQuery = `UPDATE User SET leaderboardID = ? WHERE id = ?`;
            db.run(updateUserQuery, [leaderboard.id, userId], function (err) {
              if (err) return reject(err);
              resolve({
                message: "User joined existing leaderboard",
                changes: this.changes,
              });
            });
          } else {
            // If leaderboard does not exist, create a new leaderboard
            const newLeaderboardId = uuidv4(); // Generate a new GUID for the leaderboard
            const createLeaderboardQuery = `INSERT INTO Leaderboard (id, joinCode, users) VALUES (?, ?, ?)`;

            db.run(
              createLeaderboardQuery,
              [newLeaderboardId, leaderboardJoinCode, JSON.stringify([userId])],
              function (err) {
                if (err) return reject(err);

                // Update the user's leaderboardID with the newly created leaderboard's id
                const updateUserQuery = `UPDATE User SET leaderboardID = ? WHERE id = ?`;
                db.run(
                  updateUserQuery,
                  [newLeaderboardId, userId],
                  function (err) {
                    if (err) return reject(err);
                    resolve({
                      message: "Created new leaderboard and joined",
                      changes: this.changes,
                    });
                  }
                );
              }
            );
          }
        }
      );
    });
  },

  getUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM User WHERE id = ?`;
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
