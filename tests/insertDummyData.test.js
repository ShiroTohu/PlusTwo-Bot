const Sequelize = require('sequelize'); 

const setupDatabase = require('../source/database/setupDatabase.js');
const insertDummyData = require('./helpers/insertDummyData.js');

test('pass if setupDatabase works', async () => {
    const sequelize = new Sequelize('sqlite::memory:'); 
    setupDatabase(sequelize);

    await insertDummyData(sequelize);
    console.log(sequelize.models);
});
