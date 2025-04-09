const insertDummyData = require('./insertDummyData.js');
const setupDatabase = require('../source/database/setupDatabase.js'); 

async function setupTestDatabase() {
  const sequelize = setupDatabase();
  sequelize.sync({force: true});

  await insertDummyData(sequelize);

  return sequelize;
}

const sequelize = setupTestDatabase();

module.exports = sequelize;
