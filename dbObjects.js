const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database/database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);

// possibly find a way to not reuse this much code for two functions that basically do the same thing.
// but for the time being let's MAKE SURE IT WORKS before refactoring it and modularizing it.
Reflect.defineProperty(Users.prototype, 'plusTwo', {
	value: async (user) => {
        User = await Users.findOne({
			where: {user_id: String(user.id)}
		});
	
		if (User) {
			User.score += 2;
			return userItem.save();
		} else {
			return Users.create({user_id: this.user_id, username: user.username, score: 0 })
		}
	},
});

Reflect.defineProperty(Users.prototype, 'minusTwo', {
	value: async (user) => {
        User = await Users.findOne({
			where: {user_id: String(user.id)}
		});
	
		if (User) {
			User.score += -2;
			return userItem.save();
		} else {
			return Users.create({user_id: this.user_id, username: user.username, score: 0 })
		}
	},
});

module.exports = { Users };