const sqlite3 = require('sqlite3').verbose();
const fs = require('node:fs');

class Database extends sqlite3.Database {
    static createDatabase() {
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
            db = new this(`${folder}/${databaseName}.db`);
            db.exec(`
                CREATE TABLE scores (
                    user_id INT PRIMARY KEY NOT NULL UNIQUE,
                    username TEXT NOT NULL,
                    score int
                );`
            );
            return db;
        } else {
            return new this(`${folder}/${databaseName}.db`);;
        }
    }

    async createUser(user) {
        return await this.run(`INSERT INTO scores (user_id, username, score) VALUES(${user.id}, "${user.username}", 0)`);
    }

    async userExists(user) {
        return await this.run(`SELECT 1 FROM scores WHERE user_id = ${user.id};`);
    }

    async getScore(user) {
        return await this.run(`SELECT score FROM scores WHERE user_id = ${user.id}`);
    }

    async adjustScore(user) {
        if (await this.userExists(userId)) {
            this.createUser(userId)
        }

        score = this.getScore(userId);
        new_score = score + delta;
        return await this.run(`
            UPDATE score 
            SET score = ${new_score}
            WHERE user = ${user.id}
        `);
    }
}

module.exports = {
    Database
};