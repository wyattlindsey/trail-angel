'use strict';

/*
  default settings available for all environments to extend and override
*/

const all = {
  ENV: process.env.NODE_ENV || 'development',

  PORT: process.env.PORT || 4000
};

const envPath = `./${all.ENV}`;
const env = require(envPath);

module.exports = Object.assign(all, env || {});
