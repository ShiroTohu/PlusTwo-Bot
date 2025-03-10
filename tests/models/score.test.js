const setupDatabase = require('./../../source/database/setupDatabase.js');
const insertDummyData = require('./../insertDummyData.js');

const existingGuildId = '827597916039016962';
const existingUserId = '997027454665226734';

let sequelize;
let Guild;

beforeAll(async () => {
    sequelize = setupDatabase();
    await sequelize.sync({force: true});

    Guild = sequelize.models.Guild;

    // console.log(sequelize.models.User);
    await insertDummyData(sequelize);
});

describe('+2 -2 functions', () => {
    test('');
});