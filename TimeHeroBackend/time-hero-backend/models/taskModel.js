const db = require('../config/db');

const Task = {
    getAvailableTasks: () => {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Task`;
            db.all(query, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }
};

module.exports = Task;
