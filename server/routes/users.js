var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('hi shudong.wang stark');
});

module.exports = router;