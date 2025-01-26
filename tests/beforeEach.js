beforeEach(() => {
    console.log('bruh');
    return new Sequelize('sqlite::memory:');
});