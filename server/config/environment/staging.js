'use strict';

module.exports = {
  MYSQL_DB_NAME:      process.env.RDS_DB_NAME,
  MYSQL_DB_USERNAME:  process.env.RDS_USERNAME,
  MYSQL_DB_PASSWORD:  process.env.RDS_PASSWORD,
  MYSQL_DB_HOSTNAME:  process.env.RDS_HOSTNAME,
  MYSQL_DB_PORT:      process.env.RDS_PORT,

  REDIS_HOST:         'redis-staging.78dvd2.ng.0001.usw2.cache.amazonaws.com:6379'
};