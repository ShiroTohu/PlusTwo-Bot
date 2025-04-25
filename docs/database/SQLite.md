# SQLite
SQLite is the default database that is used if the user does not specify a postgres server. There should be no need for the user to create this database manually and it will be created on boot.

If the SQLite server is not working make sure that the required dependencies for sequelize is installed.
```
npm install sequelize sqlite3
```
