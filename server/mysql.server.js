var Sequelize = require('sequelize');
const config = require('./config/environment');

var db = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
      host: config.DB_HOSTNAME,
      port: config.DB_PORT,
      dialect: 'mysql'
    });

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

exports.db = db;