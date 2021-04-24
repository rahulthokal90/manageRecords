const express = require('express');
const records = require('../routes/records');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/records', records);
  app.use(error);
}