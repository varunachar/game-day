var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;

  res.send('Received name=' + name + " " + ", email=" + email + ", mobile=" + mobile);
});

module.exports = router;
