const Sequelize = require('sequelize'); 
const setupDatabase = require('../source/database/setupDatabase.js');

test('pass if setupDatabase works', async () => {
    const sequelize = new Sequelize('sqlite::memory:') 
    expect(setupDatabase(sequelize)).not.toBeNull(); 
});
