var redis = require('redis');
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var geoMapper = redis.createClient();

geoMapper.on('connect', function() {
  console.log('Redis server is connected');
});

exports.geoMapper = geoMapper;
