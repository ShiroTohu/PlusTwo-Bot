// database environments, feel free to change these if needed

module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "sqlite",
    logging: false,
    storage: './development.sqlite'
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_HOST,
    dialect: "sqlite",
    logging: false,
    storage: './testing.sqlite'
  },
  production: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_HOST,
    dialect: "postgres",
    logging: false
  }
};
