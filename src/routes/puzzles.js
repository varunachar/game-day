var express = require('express');
var mapDb = require('../data/mapDb');
var userDb = require('../data/userDb');
var router = express.Router();

function checkUser(req) {
    var userId = req.headers['userid'];
    if (!userId) {
        var err = new Error();
        err.status = 404;
        return err;
    };
    return null;
}

class Puzzle {
    /**
     * 
     * @param {String} name 
     * @param {String} solution 
     * @param {String} level 
     */
    constructor(name, solution, level) {
        this.name = name;
        this.solution = solution;
        this.level = level;
    }
}
const puzzleSolutions = {
    "whatzit1" : new Puzzle("whatzit1", "Too close for comfort", 1),
    "whatzit2" : new Puzzle("whatzit2", "Too close for comfort", 2),
    "playPuz" : new Puzzle("playPuz", "Too close for comfort", 3),
}

/* GET file system listing. */
router.post('/', function (req, res, next) {
    var err = checkUser(req);
    if (err) {
        return next(err);
    };
    var puzzleName = req.body.puzzle;
    var isCorrect = false;
    var puzzle = puzzleSolutions[puzzleName];
    if(puzzle.solution.toLowerCase() === req.body.answer.toLowerCase()) {
        isCorrect = true;
        userDb.usersDb.get(req.headers['userid']).level = puzzle.level;
    }
    res.send({correct: isCorrect});
});

module.exports = router;