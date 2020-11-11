var express = require('express');
var router = express.Router();
const { User } = require('../models/user');

// Start express, Sequelize generates models, established DB connection
// Then Models are ready to be used within routes

// import User model

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = await User.findAll();
  res.send(console.log("All users:", JSON.stringify(users, null, 2));
});

router.post('/sign-up', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;
