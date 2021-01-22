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

/* GET users listing. */
router.post('/register', function (req, res, next) {
  var user = new User(req.body.name, req.body.email, req.body.mobile);
  user = saveUser(user);
  res.send(JSON.stringify({
    user: user.getUser(),
    folders: mapDb.mapDb[user.level]
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
  userDb.usersDb.save(user);
  return user;
}

module.exports = router;
