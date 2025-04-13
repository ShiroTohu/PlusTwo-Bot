const insertDummyData = require('./insertDummyData.js');
const setupDatabase = require('../source/database/setupDatabase.js'); 

// runs the setup then returns the sequelize object to be used in tests.
async function setupTestDatabase() {
  const sequelize = setupDatabase();
  sequelize.sync({force: true});
  console.log(sequelize.models);

  // inserts the dummy data into the sequelize instance.
  await insertDummyData(sequelize);
  await sequelize.sync();

  return sequelize;
}

const sequelize = setupTestDatabase();

module.exports = sequelize;
