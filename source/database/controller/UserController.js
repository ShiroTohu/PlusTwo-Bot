const { Users } = require('../models/Users')

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);



exports.Users = Users;