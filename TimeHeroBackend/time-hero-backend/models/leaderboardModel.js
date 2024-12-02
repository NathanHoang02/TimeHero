const db = require('../config/db');

const Leaderboard = {
    getLeaderboard: (leaderboardId) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.id, u.username, u.accumulatedTime 
                FROM User u
                INNER JOIN Leaderboard l ON u.leaderboardID = l.id
                WHERE l.id = ?`;
            db.all(query, [leaderboardId], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    createJoinCode: (leaderboardId, joinCode) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO Leaderboard (id, joinCode) VALUES (?, ?)`;
            db.run(query, [leaderboardId, joinCode], function (err) {
                if (err) return reject(err);
                resolve(this.lastID); // Returns the inserted row ID
            });
        });
    }
};

module.exports = Leaderboard;

