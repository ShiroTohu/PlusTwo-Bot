const Sequelize = require('sequelize'); 
const setupDatabase = require('../source/database/setupDatabase.js');

test('pass if setupDatabase works', () => {
    const sequelize = new Sequelize('sqlite::memory:') 
    expect(setupDatabase(sequelize)).not.toBeNull();
   
    console.log(sequelize.models.Users.findAll());
    expect(sequelize.models.Users);
});
