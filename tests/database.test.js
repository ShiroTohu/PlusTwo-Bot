const { setupDatabase } = require('../source/database/database.js');

test('dummy data created', async () => {
    setupDatabase(true)
});