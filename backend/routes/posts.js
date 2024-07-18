
var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/users');
const Post = require('../models/posts');
const { checkBody } = require('../modules/tools')


// ADD NEW POST
router.post('/add', async (req, res) => {
  if (!checkBody(req.body, ['author', 'content', 'token'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  const foundUser = await User.findOne({ token: req.body.token });
  console.log(foundUser.username)
  if (req.body.author === foundUser.username) {
    const newPost = new Post({
      author: foundUser._id,
      content: req.body.content,
      creationDate: Date.now()
    })
    newPost.save();
    res.json({ result: true, message: 'New post saved in database' });

  } else {
    res.json({ result: false, error: 'Invalid token / user' });
  }

});

// REMOVE POST
router.post('/remove', async (req, res) => {
  if (!checkBody(req.body, ['postID'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const deletePost = await Post.deleteOne({ _id: req.body.postID })
  res.json({ result: true, message: "post Deleted" })


});

// VIEW ALL POSTS
router.get('/all', async function (req, res) {
  const foundPosts = await Post.find();
  res.send({ result: true, allPosts: foundPosts });
});

// VIEW ALL POST WITH THIS # A tester, piti doute
router.get("/hashtags/:hashtag", async (req, res) => {

  const foundHashtagsPosts = await Post.find({ _id: req.params.hashtag })
  if (foundHashtagsPosts.length) {
    res.send({ result: true, allHashtagsPost: foundHashtagsPosts })
  } else {
    res.send({ result: false, error: "Aucun post trouvé avec ce Hashtag ! " })
  }
})


module.exports = router;
