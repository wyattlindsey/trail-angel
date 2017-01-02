const db = require('./user.model');

module.exports = {
  users: {
    //get all users (return all users in users table)
    //use this when we can add friends
    /*get: function (req, res) {

    },*/

    //create a user account (creates user instance in users table)
    post: function (req, res) {
      db.User.find({
        where: {
          username: 'username'/*username*/
        }
      }).then( (user) => {
        if (!user) {
          db.User.create({
            where: {
              username: 'username'/*username*/,
              firstname: 'firstname'/*firstname*/,
              lastname: 'lastname'/*lastname*/
            }
          }).then( (results) => {
            res.statusCode(201);
          });
        }
      });
    },
    //delete user account (removes instance from users table)
    delete: function(req, res) {
      db.User.destroy({
        where: {
          username: /* current username*/
        }
      }).then( (results) => {
        res.statusCode(202)
      });
    },
    //update user account (updates instance in users table)
    put: function(req, res) {

    }
  },
  trailfaves: {
    //get trailfaves for specific user (return all specific user's trail ids in usersfavorites table then obtain all trail names)
    get: function(req, res) {
      db.UsersFavorites.findAll({
        where: {
          userId: 'userId'/*userId*/
        }
      }).then( (favorites) => {
        res.json(favorites);
      });
    },
    //save trail as a favorite for specific user (create instance to usersfavorites)
    post: function(req, res) {
      db.UsersFavorites.findOrCreate({
        where: {
          userId: 'userId'/*userId*/,
          favoriteId: 'favoriteId'/*favoriteId*/
        }
      }).then( (results) => {
        res.statusCode(201);
      });
    },
    //removes instance from usersfavorites table
    delete: function(req, res) {
      db.UsersFavorites.destroy({
        where: {
          userId: 'userId'/*userId*/,
          favoriteId: 'favoriteId'/*favoriteId*/
        }
      }).then( (userfavorite) => {
        res.statusCode(202);
      });
    }
  }
};
