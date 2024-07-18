var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// SIGN UP
router.post('/signup', function (req, res, next) {
  res.send('respond with a resource');
});

// SIGN IN
router.post('/signin', function (req, res, next) {
  res.send('respond with a resource');
});

// LOG OUT
router.post('/logout', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
