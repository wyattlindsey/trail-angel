var Sequelize = require('sequelize');
const config = require('./environment/index');

var db = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_DB_USERNAME, config.MYSQL_DB_PASSWORD, {
      host: config.MYSQL_DB_HOSTNAME,
      port: config.MYSQL_DB_PORT,
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