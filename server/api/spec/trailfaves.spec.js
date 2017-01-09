var supertest = require("supertest");
var expect = require('chai').expect;
var db = require('../model/model.js');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:4000");

describe("Trailfaves: ",function(){

  before(function() {
    db.User.findOrCreate({
      where: {
        user: '1038222134277651122'
      }
    }).then((user) => {
      db.Favorite.findOrCreate({
        where: {
          favorite: 'hollywood-trails'
        }
      }).then((favorites) => {
        db.UsersFavorites.findOrCreate({
          where: {
            userId: user[0].dataValues.id,
            favoriteId: favorites[0].dataValues.id
          }
        }).then( (usersfavorites) => {
          /*nothing*/
        });
      });
    });
  });

  after(function() {
    db.User.find({
        where: {
          user: '1038222134277651122'
        }
      }).then((user) => {
        db.Favorite.find({
          where: {
            favorite: 'hollywood-trails'
          }
        }).then((favorites) => {
          db.UsersFavorites.destroy({
            where: {
              userId: user[0].dataValues.id,
              favoriteId: favorites[0].dataValues.id
            }
          }).then( (usersfavorites) => {
            db.User.destroy({
              where: {
                user:'1038222134277651122'
              }
            }).then( (data) => {
              console.log('user destroyed--------');
            });
            db.Favorite.destroy({
              where: {
                favorite: 'hollywood-trails'
              }
            }).then( (data) => {
              console.log('favorite destroyed---------------');
            });
          });
        });
      });
  });


  it("should post favorite to trailfaves and return 201",function(done){

    server
    .post("/api/trailfaves/shoreline-trails")
    .send({ userId: '1038222134277651122'})
    .expect(201)
    .end(function(err,res){
      expect(res.status).to.equal(201);
      expect(res.body.error).to.equal(undefined);
      done();
    });
  });

  it("should get all favorites for specific user and return 201",function(done){

    server
    .get("/api/trailfaves/user/1038222134277651122")
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200);
      expect(res.body[0]).to.equal('hollywood-trails');
      expect(res.body.error).to.equal(undefined);
      done();
    });
  });

  it("should delete trailfave from trailfaves and return 200",function(done){

    server
    .delete("/api/trailfaves/shoreline-trails")
    .send({ userId: '1038222134277651122'})
    .expect(200)
    .end(function(err,res){
      expect(res.status).to.equal(200);
      expect(res.body.error).to.equal(undefined);
      done();
    });
  });


});