//seed the database

/**
 *  This file should be a standalone script that seeds your database,
 *  making testing interactions with your database much easier.
 *
 *  You should be able to run this file from Terminal with:
 *
 *    node ./seed.js
 *
 *  And populate your database with all the data from `data.json`
 */

'use strict';
var Sequelize = require('sequelize');
var db = new Sequelize('trailangel', 'root', '', {
      dialect: "mysql",
      port:    3306,
    });

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

const fs = require('fs');

var User = db.define('user', {
  user: { type: Sequelize.STRING, field: 'user', unique: 'user' }
});

var Favorite = db.define('favorite', {
  favorite: { type: Sequelize.STRING, field: 'favorite', unique: 'favorite' }
});

var UsersFavorites = db.define('usersfavorites', {});

//This will add methods getUsers, setUsers, addUsers to Favorites, and getFavorites, setFavorites and addFavorite to User.
User.belongsToMany(Favorite, {through: UsersFavorites});
Favorite.belongsToMany(User, {through: UsersFavorites});

// Step 1: Drop old data
// User.drop([]).then((results) => {
//   console.log('--------------table has been dropped');
// });
// Favorite.drop([]);
// UsersFavorites.drop([]);


//Step 2: Create tables
User.sync({force: true})
  .then(function(err) {
    console.log('Created Users Table');
  }, function (err) {
    console.log('An error occurred while creating the Users table:', err);
  });
Favorite.sync({force: true});
UsersFavorites.sync({force: true});

//Step 3: Seed tables with mock data
fs.readFile(__dirname + '/data.json', 'utf8', (err, data) => {
  if (err) {
    console.error('error reading data file');
    process.exit(1);
  }

  JSON.parse(data).forEach((userTrail) => {
    User.findOrCreate({
      where: {
        user: userTrail.user
      }
    }).then( (user) => {
      console.log('Created!', user);
      return user[0].dataValues.id;
    }).then( (userId) => {
      Favorite.findOrCreate({
        where: {
          favorite: userTrail.favorite
        }
      }).then( (favorite) => {
        console.log('Created!', favorite[0].dataValues);
        UsersFavorites.findOrCreate({
          where: {
            userId: userId,
            favoriteId: favorite[0].dataValues.id
          }
        });
      });
    });
  });
});

