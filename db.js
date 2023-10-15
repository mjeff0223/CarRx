const Sequelize = require('sequelize');
const config = require('./config')

// Initialize Sequelize with the appropriate configuration for your environment (e.g., 'development', 'production', 'testing')
const sequelize = new Sequelize(config.development);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
