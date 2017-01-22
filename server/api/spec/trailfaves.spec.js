var supertest = require("supertest");
var expect = require('chai').expect;
var db = require('../model/model.js');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:4000");

describe("Trailfaves: ",function(){

  before(function() {
    db.User.create({
      where: {
        user: '1038222134277651122'
      }
    });
  });

  after(function() {
    db.User.destroy({
      where: {
        user: '1038222134277651122'
      }
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
      expect(res.body[0]).to.equal('shoreline-trails');
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