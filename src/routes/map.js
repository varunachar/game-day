var express = require('express');
var mapDb = require('../data/mapDb');
var userDb = require('../data/userDb');
var router = express.Router();

function checkUser(req) {
    var userId = req.headers['userid'];
    if (!userId) {
        var err = new Error();
        err.status = 404;
        return (false, err);
    };
    return (true, null);
}

/* GET file system listing. */
router.get('/', function (req, res, next) {
    var success, err = checkUser(req);
    if (!success) {
        return next(err);
    };
    res.send(JSON.stringify(mapDb.mapDb[userDb.usersDb.get(req.headers['userid']).stage]));
});

router.get('/folder', function(req, res, next){
    var success, err = checkUser(req);
    if (!success) {
        return next(err);
    };
    var isLocked = mapDb.mapDb.searchFolder(userDb.usersDb.get(req.headers['userid']).stage, req.body.folder);
    res.send({"isLocked" : isLocked});
});

module.exports = router;