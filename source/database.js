const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');
const path = require('node:path');
const { run } = require('node:test');

function createDatabase() {
    const folder = 'database/'
    const databaseName = 'database'

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Database directory created');
        });
    }

    if (!fs.existsSync(`${folder}/${databaseName}.db`)) {
        db = new sqlite3.Database(`${folder}/${databaseName}.db`);
        db.exec(`
            create table scores (
                user_id int primary key not null unique,
                username text,
                score int
            );`
        );
        return db;
    } else {
        db = new sqlite3.Database(`${folder}/${databaseName}.db`);
        return db;
    }
}

db = createDatabase()
module.exports = {
    db
};