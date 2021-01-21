var express = require('express');
const { v4: uuidv4 } = require('uuid');
var router = express.Router();

var usersDb = {

}

/* GET users listing. */
router.post('/register', function(req, res, next) {
  var user = {
    name : req.body.name,
    email : req.body.email,
    mobile: req.body.mobile
  }
  user = saveUser(user);
  res.send(JSON.stringify(user))
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
  usersDb[user.userId] = user;
  return user;
}

module.exports = router;
