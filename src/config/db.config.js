require('dotenv').config();

const { DB_CONNECTION, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } =
  process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME || 'library_catalogue_system',
    host: DB_HOST || '127.0.0.1',
    dialect: DB_CONNECTION || 'mysql',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_CONNECTION,
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_CONNECTION,
  },
};
