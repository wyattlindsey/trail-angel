//users controller

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
    }
  }
};
