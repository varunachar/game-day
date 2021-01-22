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
    "whatzit2" : new Puzzle("whatzit2", "Top gun", 2),
    "scramble1" : new Puzzle("scramble1", "YDEEPS", 3),
    "scramble2" : new Puzzle("scramble2", "ARTSKJID", 4),
    "scramble3" : new Puzzle("scramble3", "MHTIROGLA", 5),
    "scramble4" : new Puzzle("scramble4", "YRASSECEN", 6),
    "scramble5" : new Puzzle("scramble5", "CODE", 7),
    "razorpays" : new Puzzle("razorpays", "billion", 8),
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
    var user = userDb.usersDb.get(req.headers['userid']);
    if(puzzle.level > user.level+1) {
        var err = new Error("You cheat!");
        err.status = 401;
        return next(err);
    }
    if(puzzle.solution.toLowerCase() === req.body.answer.toLowerCase()) {
        isCorrect = true;
        user.level = puzzle.level;
    }
    res.send({correct: isCorrect});
});

/* GET users listing. */
router.post('/level', function (req, res, next) {
    var playable = false;
    var user = userDb.usersDb.get(req.headers['userid']);
    var puzzle = puzzleSolutions[req.body.puzzle];
    if(puzzle.level === user.level+1) {
        playable = true;
    }
    res.send(JSON.stringify({
      playable: playable
    }))
  });

module.exports = router;