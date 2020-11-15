var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/all', async function(req, res, next) {
  
  const reviews = await models.Review.findAll();
  
  res.send(JSON.stringify(reviews));
});

router.get('/ratings', async function(req, res, next) {
  
  const ratings = await models.Review.findAll({
    attributes: [
    "TDD_rating",
    "Fluency_rating",
    "Debug_rating",
    "Model_rating",
    "Refactor_rating",
    "Agile_rating",
    "Maintainability_rating"],
    where: {
      userId: 1
    }
  });
  
  res.send(JSON.stringify(ratings));
});


module.exports = router;