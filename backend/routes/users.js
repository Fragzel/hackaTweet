
var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/tools')


// SIGN UP
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstname', 'username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  // Check if the user has not already been registered
  User.findOne({ username: req.body.username }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32)
      });

      newUser.save().then(newDoc => {

        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

// SIGN IN
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: req.body.username }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

// LOG OUT
router.post('/logout', function (req, res) {
  res.send({ result: true, message: 'Successfully disconnected' });
});

//LIKE POST
router.post('/likePost', async function (req, res) {
  if (req.body.username && req.body.token && req.body.postID) {
    const foundUser = await User.findOne({ username: req.body.username, token: req.body.token });
    foundUser.likedPosts.push(req.body.postID);
    foundUser.save();
    res.send({ result: true, like: !req.body.like });
  } else {
    res.send({ result: false, error: "Please login and use correct post ID" });
  }
});

//UNLIKE POST
router.post("/unlikePost", async function (req, res) {
  if (req.body.username && req.body.token && req.body.postID) {
    const foundUser = await User.findOne({ username: req.body.username, token: req.body.token });
    foundUser.likedPosts = foundUser.likedPosts.filter(e => e !== req.body.postID)
    foundUser.save();

    res.send({ result: true, message: "Sucessfully unliked" });
  } else {
    res.send({ result: false, error: "Please login and use correct post ID" });
  }
});

//

module.exports = router;
