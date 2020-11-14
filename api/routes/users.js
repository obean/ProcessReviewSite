var express = require('express');
var router = express.Router();
var  models  = require('../models');
const bcrypt = require('bcrypt')


// local strategy
module.exports = ( passport) => {
  //serialize use
  passport.serializeUser(function(user, cb) {
    cb(null, {username: user.username});
  });

  //deserialize
  passport.deserializeUser(function(id, cb) {
    models.User.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });
 
  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(
    async function(username, password, cb) {
      // console.log(username, password)
        try {
             const user = await models.User.findOne({
              where: { username: username}
            })
            if(!user) {
              console.log("not found!")
              return cb(null, false)
            }  
            if(!bcrypt.compareSync(password, user.password)){
              console.log("incorrect password")
              return cb(null, false)
            }
            return cb(null, user)

        } catch (err) {
            console.log(err)
            return cb(err)
        }
  }))

  //verify login via local strategy
  router.post('/login',
    passport.authenticate('local' ),//{ failureRedirect: '/login' }
      function(req, res) {
        // console.log(res)
        res.send(JSON.stringify(200));
        //console.log(typeof req)
      }
  );

  router.get('/logged-in', loggedIn, function(req, res) {
    console.log(isAuthenticated)
    console.log(req.user)
    console.log(req.body)
  })

  function loggedIn(req, res, next) {
    if( req.isAuthenticated()) {
        
      console.log("true")
      return next()
    } else {
      console.log("not authenticated")
    }
  }

  return router

}

// Start express, Sequelize generates models, established DB connection
// Then Models are ready to be used within routes

// import User model

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  const users = await models.User.findAll();
  
  res.send(JSON.stringify(users));
});

// router.post('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.post('/new', async function(req, res, next) {
//   // console.log(req.body + 'req')
 
//   const user = await models.User.create({ firstName: req.body.firstName, lastName: req.body.lastName, password: 'password', email: req.body.email });
//   res.send(JSON.stringify(user));  ;
// });
  router.post('/new', async function(req, res, next) {
    await console.log(req.body.password)
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt)
  const hash = bcrypt.hashSync(req.body.password, salt)
  const user = await models.User.create({ firstName: req.body.firstName, username: req.body.username, lastName: req.body.lastName, password: hash, email: req.body.email });
  
});

// router.get('/sign-up', function(req, res, next) {
//   res.send('respond with a resource');
// });
//module.exports = router;
