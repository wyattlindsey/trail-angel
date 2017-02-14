var Sequelize = require('sequelize');
const config = require('./environment/index');

var db = new Sequelize(config.MYSQL_DATABASE_URL);

db.authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.error('Unable to connect to the database:', err);
  });

exports.db = db;