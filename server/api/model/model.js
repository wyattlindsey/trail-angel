var db = require('../../config/mysql.server.js').db;
var Sequelize = require('sequelize');


var User = db.define('user', {
  user: { type: Sequelize.STRING, field: 'user', unique: 'user' }
});

var Favorite = db.define('favorite', {
  favorite: { type: Sequelize.STRING, field: 'favorite', unique: 'favorite' }
});

var UsersFavorites = db.define('usersfavorites', {});

var SupplyItem = db.define('supplyitem', {
  supplyitem: {type: Sequelize.STRING, field: 'supplyitem'},
  ischecked: {type: Sequelize.BOOLEAN, field: 'ischecked', defaultValue: false}
})

//This will add methods getUsers, setUsers, addUsers to Favorites, and getFavorites, setFavorites and addFavorite to User.
User.belongsToMany(Favorite, {through: UsersFavorites});
Favorite.belongsToMany(User, {through: UsersFavorites});
SupplyItem.belongsTo(User);

// If we are adding columns or otherwise changing the schema
// we can add {force: true} inside .sync to drop the tables
// NOTE: THIS DELETES ALL THE DATA IN THE TABLE
User.sync()
  .then(function(err) {
    console.log('Created Users Table');
  }, function (err) {
    console.log('An error occurred while creating the Users table:', err);
  });

Favorite.sync();
UsersFavorites.sync();
SupplyItem.sync();

exports.User = User;
exports.Favorite = Favorite;
exports.UsersFavorites = UsersFavorites;
exports.SupplyItem = SupplyItem;
