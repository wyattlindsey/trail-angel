'use strict';

const db = require('../model/model.js');

module.exports = {
  users: {
    //create a user to link with trails (creates user instance in users table)
    /**********body should contain*******/
      //req.body.user (email address or any user identifier, stored at login/signup)
    post: function (req, res) {
      db.User.findOrCreate({
        where: {
          user: req.body.user
        }
      }).then( (user) => {
        // console.log(user);
        res.sendStatus(201);
      });
    },
    //delete user account (removes instance from users table)
    /**********body should contain*******/
      //req.body.user (email address or any user identifier, stored at login/signup)
    delete: function(req, res) {
      db.User.find({
        where: {
          user: req.body.user
        }
      }).then( (userID) => {
        // console.log("-----------", userID);
        db.UsersFavorites.destroy({
          where: {
            userId: userID.dataValues.id
          }
        }).then( (userfavorite) => {
          // console.log('userfavorite----------', userfavorite);
          db.User.destroy({
            where: {
              id: userID.dataValues.id
            }
          }).then( (user) => {
            console.log('user destroyed');
          });
          res.sendStatus(202);
        });
      });
    },
  },
  trailfaves: {
    //get trailfaves for specific user (return all specific user's trail ids in usersfavorites table then obtain all trail names)
    /****************body should contain*************/
      //req.body.user (email address or any user identifier, stored at login/signup)
    get: function(req, res) {
      db.User.find({
        where: {
          user: req.body.user
        }
      }).then( (userID) => {
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
    /******************body should contain**********/
      //req.body.user (email address or any user identifier, stored at login/signup)
      //req.body.favorite (name of the trail)
    post: function(req, res) {
      db.User.find({
        where: {
          user: req.body.user
        }
      }).then( (userID) => {
        db.Favorite.findOrCreate({
          where: {
            favorite: req.body.favorite
          }
        }).then( (favoriteID) => {
          db.UsersFavorites.findOrCreate({
            where: {
              userId: userID.dataValues.id,
              favoriteId: favoriteID[0].dataValues.id
            }
          }).then( (results) => {
            res.sendStatus(201).json('Created');
          });
        });
      });
    },
    //removes instance from usersfavorites table
    /***********body should contain*******/
      //req.body.user (email address or any user identifier, stored at login/signup)
      //req.body.favorite (name of the trail)
    delete: function(req, res) {
      db.User.find({
        where: {
          user: req.body.user
        }
      }).then( (userID) => {
        db.Favorite.find({
          where: {
            favorite: req.body.favorite
          }
        }).then( (favoriteID) => {
          // console.log("this is favoriteID ============", favoriteID)
          db.UsersFavorites.destroy({
            where: {
              userId: userID.dataValues.id,
              favoriteId: favoriteID.dataValues.id
            }
          }).then( (userfavorite) => {
            res.sendStatus(202);
          });
        });
      });
    }
  }
};
