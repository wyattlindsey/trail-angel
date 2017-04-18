var Sequelize = require('sequelize');
const config = require('./environment/index');

console.log(JSON.stringify(config));
//var db = new Sequelize(config.MYSQL_DATABASE_URL);

//Use this instead of above db connection for now while working on local backend
var db = new Sequelize('trailangel', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});


db.authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.error('Unable to connect to the database:', err);
  });

exports.db = db;
