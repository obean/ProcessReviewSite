var express = require('express');
var router = express.Router();
var  models  = require('../models');
const bcrypt = require('bcrypt');




// Start express, Sequelize generates models, established DB connection
// Then Models are ready to be used within routes

// import User model

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  const users = await models.User.findAll();
  
  res.send(JSON.stringify(users));
});

router.post('/new', async function(req, res, next) {

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt)
  const user = await models.User.create({ firstName: req.body.firstName, lastName: req.body.lastName, password: hash, email: req.body.email });
  
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);



// router.get('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });
module.exports = router;
