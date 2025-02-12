import { config } from "dotenv"

module.exports({
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "sqlite",
    logging: false
  },
  test: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_TEST_HOST,
    dialect: "sqlite",
    logging: false
  },
  production: {}
})
