'use strict';

const db = require('../model/model.js');

module.exports = {
  users: {
    //create a user to link with trails (creates user instance in users table)
    post: function (req, res) {
      db.User.findOrCreate({
        where: {
          user: req.body.user
        }
      }).then( (user) => {
        res.sendStatus(201);
      });
    },
    //delete user account (removes instance from users table)
    delete: function(req, res) {
      db.User.find({
        where: {
          user: req.params.id
        }
      }).then( (userID) => {
        db.UsersFavorites.destroy({
          where: {
            userId: userID.dataValues.id
          }
        }).then( (userfavorite) => {
          db.User.destroy({
            where: {
              id: userID.dataValues.id
            }
          }).then( (user) => {
            console.log('user destroyed');
          });
          res.sendStatus(200);
        });
      });
    },
  },
  trailfaves: {
    //get trailfaves for specific user (return all specific user's trail ids in usersfavorites table then obtain all trail names)
    get: function(req, res) {
      db.User.find({
        where: {
          user: req.params.id
        }
      }).then( (userID) => {
        console.log('-----------------req.params', req.params);
        db.UsersFavorites.findAll({
          where: {
            userId: userID.dataValues.id
          }
        }).then( (favorites) => {
          var ids = [];
          favorites.forEach( (favoriteID) => {
            ids.push(favoriteID.dataValues.favoriteId);
          });
          db.Favorite.findAll({
            where: {
              id: {
                $or: ids
              }
            }
          }).then( (favoriteNames) => {
            var trailNames = [];
            favoriteNames.forEach( (favoriteName) => {
              trailNames.push(favoriteName.dataValues.favorite);
            });
            res.json(trailNames);
          });
        });
      });
    },
    //save trail as a favorite for specific user (create instance to usersfavorites)
    post: function(req, res) {
      db.User.find({
        where: {
          user: req.body.userId
        }
      }).then( (userID) => {
        console.log('============userID from ', userID, req.body.userId)
        db.Favorite.findOrCreate({
          where: {
            favorite: req.params.id
          }
        }).then( (favoriteID) => {
          db.UsersFavorites.findOrCreate({
            where: {
              userId: userID.dataValues.id,
              favoriteId: favoriteID[0].dataValues.id
            }
          }).then( (results) => {
            res.sendStatus(201);    // json('Created'); <-- this seems to generate some
                                    // errors related to headers being sent again
          });
        });
      });
    },
    //removes favorite for specific user (removes user-trail relation)
    delete: function(req, res) {
      db.User.find({
        where: {
          user: req.body.userId
        }
      }).then( (userID) => {
        db.Favorite.find({
          where: {
            favorite: req.params.id
          }
        }).then( (favoriteID) => {
          db.UsersFavorites.destroy({
            where: {
              userId: userID.dataValues.id,
              favoriteId: favoriteID.dataValues.id
            }
          }).then( (userfavorite) => {
            res.sendStatus(200);
          });
        });
      });
    }
  }
};
