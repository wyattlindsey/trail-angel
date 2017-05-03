var Sequelize = require('sequelize');
var config = require('./environment/index');

var db = process.env.NODE_ENV === 'development'
  ? new Sequelize('trailangel', 'root', null, {
      host: 'localhost',
      dialect: 'mysql'
    })
  : new Sequelize(config.MYSQL_DATABASE_URL);


db.authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.error('Unable to connect to the database:', err);
  });

exports.db = db;
