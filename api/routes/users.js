var express = require('express');
var router = express.Router();
var  models  = require('../models');
const bcrypt = require('bcrypt')


// local strategy
module.exports = ( passport) => {
  //serialize use
  passport.serializeUser(function(user, cb) {
    cb(null, user);
    
  });

  //deserialize
  passport.deserializeUser(function(user, cb) {
    models.User.findByPk(user.id, function (err, user) {
      console.log(user.id)
      if (err) { return cb(err); }
       cb(null, user);
    });
  });
 
  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(
    async function(username, password, cb) {
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
    passport.authenticate('local' ),
      function(req, res) {
        res.send(JSON.stringify(200));
      }
  );





  router.get('/logged-in', loggedIn, async function(req, res, id) {
    const user = await models.user.findByPk(id)
    res.status(200).send(JSON.stringify(user))
  })

//this is the function if the passport stuff worked
  // function loggedIn(req, res, next) {
  //   if( req.isAuthenticated()) {
        
  //     console.log("true")
  //     return next()
  //   } else {
  //     console.log("not authenticated")
  //   }
  // }


  function loggedIn(req, res, next) {
    var sessionRequest = Object.keys(req.sessionStore.sessions)[Object.keys(req.sessionStore.sessions).length-1]
    if(sessionRequest){
      var user = JSON.parse(req.sessionStore.sessions[sessionRequest]).passport.user
     user.isAdmin ? res.status(200).send(JSON.stringify({id: user.id, username: user.username, isAdmin: user.isAdmin})) : res.status(200).send(JSON.stringify({id: user.id, username: user.username}))
    } else {
        res.status(401).send(JSON.stringify("unauthorised"))
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


  router.post('/new', async function(req, res, next) {
 
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt)
  const hash = bcrypt.hashSync(req.body.password, salt)
  try {
  const user = await models.User.create({ firstName: req.body.firstName, username: req.body.username, lastName: req.body.lastName, password: hash, email: req.body.email, isAdmin: req.body.isAdmin });
  
  if(await user){
  res.status(200).send()
} else {
  res.status(400).send()
}
} catch(e) {
  console.log(e)
}
});


