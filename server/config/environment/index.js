'use strict';

/*
  default settings available for all environments to extend and override
*/

const all = {
  ENV: process.env.NODE_ENV || 'staging',

  PORT: process.env.PORT || 4000,

  REDIS_PORT: 6379
};

const envPath = `./${all.ENV}`;
const env = require(envPath);

module.exports = Object.assign(all, env || {});