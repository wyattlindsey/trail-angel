var redis = require('redis');
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const config = require('./environment/index');
var geoMapper = redis.createClient(config.REDIS_URL);

geoMapper.on('connect', function() {
  console.log('Redis server is connected');
});

exports.geoMapper = geoMapper;
