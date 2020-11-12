var express = require('express');
var router = express.Router();
var  models  = require('../models');
const bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, cb) {
    console.log(username, password)
    models.User.findOne({
      where: {
        username: username
      }, function(err, user) {
        console.log("if this prints then its doing something after executing the search")
        //bcrypt.compareSync(password, user.password);
        if (err) {return cb(err); }
        if (!user) {return cb(null, "false"); }
      //  if (!isValid) {return cb(null, false)}
        return cb(null, user)
      }
    
    });
}));


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

router.post('/login', 
  passport.authenticate('local', { successRedirect: '/', failureRedirect: 'http://localhost:3000/nope' }),
  function(req, res) {
    res => JSON.stringify(200);
    //console.log(typeof req)
  });

  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });



// router.get('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
