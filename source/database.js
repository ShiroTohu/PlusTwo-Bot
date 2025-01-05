const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const path = require('node:path');

function createDatabase() {
    const folder = 'database/'
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database directory created');
        });
    }

    return db = new sqlite3.Database('database/database.db')
}

module.exports = {
    createDatabase
};