var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/all', async function(req, res, next) {
  
  const reviews = await models.Review.findAll();
  
  res.send(JSON.stringify(reviews));
});

module.exports = router;