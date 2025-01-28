const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Scores = require('./models/Scores.js')(sequelize, Sequelize.DataTypes);
const Guilds = require('./models/Guilds.js')(sequelize, Sequelize.DataTypes);

// defining associations
Users.hasMany(Scores);
Guilds.hasMany(Scores);

Scores.hasOne(Users);
Scores.hasOne(Guilds);