const { throws } = require('assert');
var express = require('express');
const { v4: uuidv4 } = require('uuid');
const userDb = require('../data/userDb');
const mapDb = require('../data/mapDb');
const { randomBytes } = require('crypto');
var router = express.Router();

class User {

  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = generateId();
    this.level = 1;
  };

  getUser() {
    return {
      name : this.name,
      email: this.email,
      phone: this.phone,
      level: this.level,
      id: this.id,
    };
  }

  levelUp() {
    this.level +=1;
  }

}

function checkUser(req) {
  var userId = req.headers['userid'];
  if (!userId) {
      var err = new Error();
      err.status = 404;
      return err;
  };
  return null;
}

/* GET users listing. */
router.post('/register', function (req, res, next) {
  var user = new User(req.body.name, req.body.email, req.body.mobile);
  user = saveUser(user);
  res.send(JSON.stringify({
    user: user.getUser(),
    folders: mapDb.mapDb[user.level]
  }))
});

/* GET users listing. */
router.post('/level', function (req, res, next) {
  var playable = false;
  var user = userDb.usersDb.get(req.headers['userId']);
  
  res.send(JSON.stringify({
    playable: playable
  }))
});

function generateId() {
  return uuidv4();
}

/**
 * Save a user in the Db
 * @param {Object} user 
 */
function saveUser(user) {
  user.userId = generateId();
  userDb.usersDb.save(user);
  return user;
}

module.exports = router;
