'use strict';

const db = require('../model/model.js');

module.exports = {
  trailfaves: {
    //get trailfaves for specific user (return all specific user's trail ids in usersfavorites table then obtain all trail names)
    get: function(req, res) {
      db.User.find({
        where: {
          user: req.params.id
        }
      }).then( (userID) => {
        db.UsersFavorites.findAll({
          where: {
            userId: userID.dataValues.id
          }
        }).then( (favorites) => {
          console.log(favorites);
          if (favorites.length === 0) {
            res.json([]);
          } else {
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
          }
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
