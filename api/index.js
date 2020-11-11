
const express = require('express');
const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

const Sequelize = require('sequelize');
    passportLocalSequelize = require('passport-local-sequelize');
var mydb = new Sequelize('mydb', 'myuser', 'mypass', {
    dialect: 'postgres',
    
    storage: 'mydb.postgres'
    });    
const sequelize = new Sequelize('postgres://localhost/process_review_api_dev');

const Schema = sequelize.Schema;
const UserDetail = new Schema({
    username: String,
    password: String
})

UserDetail