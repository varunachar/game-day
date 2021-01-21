var express = require('express');
var mapDb = require('../data/mapDb');
var userDb = require('../data/userDb');
var router = express.Router();

/* GET file system listing. */
router.get('/', function (req, res, next) {
    var userId = req.headers['userid'];
    if (!userId) {
        var err = new Error();
        err.status = 404;
        return next(err);
    };
    userDb.usersDb['userId']
    res.send()
});

module.exports = router;