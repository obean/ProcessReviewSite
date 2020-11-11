var express = require('express');
var router = express.Router();
var  models  = require('../models');



// Start express, Sequelize generates models, established DB connection
// Then Models are ready to be used within routes

// import User model

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  const users = await models.User.findAll();
  
  res.send(JSON.stringify(users, null, 2));
});

router.post('/sign-up', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;
