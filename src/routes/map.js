var express = require('express');
var router = express.Router();

/* GET file system listing. */
router.get('/', function(req, res, next) {
  res.send('Fetching map');
});

module.exports = router;