const sqlite3 = require('sqlite3').verbose();
const path = require('path');

console.log(__dirname)

const dbPath = path.resolve(__dirname, '../../sqlite/timehero.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    } else {
        console.log('Connected to the SQLite database at:', dbPath);
    }
});

module.exports = db;

