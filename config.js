

require('dotenv').config(); // Load environment variables if using dotenv

const development = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'kelz',
    password: process.env.DB_PASSWORD || 'MKkm10753299$$@',
    database: process.env.DB_DATABASE || 'CarRxDB',
};

module.exports = {
    development,
};