var express = require('express');
var router = express.Router();
var userDb = require('../data/userDb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Razorpay Engineering' });
});

router.post('/leader', function(req,res, next) {
  if(req.body.secret === "INITTOWINIT") {
    return res.send(userDb.usersDb.sortByLeader());
  }
  else {
    var err = new Error('Unauthorised');
    err.status = 401;
    return next(err);
  }
});

module.exports = router;
