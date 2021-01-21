const { throws } = require('assert');
var express = require('express');
const { v4: uuidv4 } = require('uuid');
const userDb = require('../data/userDb');
const mapDb = require('../data/mapDb');
const { randomBytes } = require('crypto');
var router = express.Router();

class User {

  PASSWORD_SIZE = 8;

  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = generateId();
    this.stage = 1;
    this.stageOnePassword = Math.random().toString(36).substring(2, this.PASSWORD_SIZE) + Math.random().toString(36).substring(2, this.PASSWORD_SIZE);
    this.stageTwoPassword = Math.random().toString(36).substring(2, this.PASSWORD_SIZE) + Math.random().toString(36).substring(2, this.PASSWORD_SIZE);
    this.stageThreePassword = Math.random().toString(36).substring(2, this.PASSWORD_SIZE) + Math.random().toString(36).substring(2, this.PASSWORD_SIZE);
    this.stageFourPassword = Math.random().toString(36).substring(2, this.PASSWORD_SIZE) + Math.random().toString(36).substring(2, this.PASSWORD_SIZE);
  };

  getUser() {
    return {
      name : this.name,
      email: this.email,
      phone: this.phone,
      stage: this.stage,
    };
  }

  levelUp() {
    this.stage +=1;
  }

}

/* GET users listing. */
router.post('/register', function (req, res, next) {
  var user = new User(req.body.name, req.body.email, req.body.mobile);
  user = saveUser(user);
  res.send(JSON.stringify({
    user: user.getUser(),
    folders: mapDb.mapDb[user.stage]
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
