const insertDummyData = require('./insertDummyData.js');
const setupDatabase = require('../../source/database/setupDatabase.js'); 

// runs the setup then returns the sequelize object to be used in tests.
async function setupTestDatabase() {
    const sequelize = await setupDatabase(); 
    await insertDummyData(sequelize);

    return sequelize;
}

module.exports = setupTestDatabase;

