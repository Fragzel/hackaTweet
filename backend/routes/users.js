
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

        res.json({ result: true, token: newDoc.token, firstname: newDoc.firstname, image: newDoc.image });
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
      res.json({ result: true, token: data.token, firstname: data.firstname, image: data.image });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

// LOG OUT
router.post('/logout', function (req, res) {
  res.json({ result: true, message: 'Successfully disconnected' });
});

//Update likeStatus POST
router.post('/likePost', async function (req, res) {
  if (req.body.username && req.body.token && req.body.postID) {
    const foundUser = await User.findOne({ username: req.body.username, token: req.body.token });
    console.log("founduser", foundUser)
    console.log("req.body username ", req.body.username)
    if (foundUser && !foundUser.likedPosts.includes(req.body.postID)) {
      foundUser.likedPosts.push(req.body.postID);
      foundUser.save();

    } else if (foundUser && foundUser.likedPosts.includes(req.body.postID)) {
      let test = foundUser.likedPosts
      test = foundUser.likedPosts.filter(e => e !== req.body.postID);
      console.log("test", test)
      foundUser.save()

    }
    res.json({ result: true, like: !req.body.like, likedPosts: foundUser.likedPosts });

  } else {
    res.json({ result: false, error: "Please login and use correct post ID" });
  }
});

//UNLIKE POST A supprimer
router.post("/unlikePost", async function (req, res) {
  if (req.body.username && req.body.token && req.body.postID) {
    const foundUser = await User.findOne({ username: req.body.username, token: req.body.token });
    foundUser.likedPosts = foundUser.likedPosts.filter(e => e !== req.body.postID)
    foundUser.save();

    res.json({ result: true, message: "Sucessfully unliked" });
  } else {
    res.json({ result: false, error: "Please login and use correct post ID" });
  }
});

//GET ALL LIKED POSTS
router.post("/allLikedPosts", async (req, res) => {
  const foundAllLiked = await User.findOne({ token: req.body.token })
  res.send({ result: true, allLikedPosts: foundAllLiked.likedPosts });
})

module.exports = router;
