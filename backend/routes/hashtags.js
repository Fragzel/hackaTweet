
var express = require('express');
var router = express.Router();
const Hashtag = require('../models/hashtags')

const { checkBody } = require('../modules/tools');

require('../models/connection');


// VIEW ALL HASHTAG NAMES
router.get("/all", async (req, res) => {
    const foundHashtag = await Hashtag.find({})
    if (foundHashtag) {
        res.send({ result: true, foundHashtag })
    } else {
        res.send({ result: false, error: "There is no Hashtag" })
    }
}
);



// VIEW ALL POST WITH THIS HASHTAG
router.post("/view", async (req, res) => {
    if (!checkBody(req.body, ['hashtag'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    const foundHashtag = await Hashtag.findOne({ name: req.body.hashtag }).populate('posts');
    if (foundHashtag) {
        if (foundHashtag.posts.length) {
            let posts = []
            for (let post of foundHashtag.posts) {
                posts.push(await post.populate('author'))
            }
            res.send({ result: true, hashtag: foundHashtag.name, posts: posts })
        } else {
            await Hashtag.deleteOne(foundHashtag);
            res.send({ result: true, message: 'Empty Hashtag was deleted' })
        }
    } else {
        res.send({ result: false, error: "No Hashtag with this name" })
    }
});


// ADD NEW HASHTAG OR UPDATE EXISTING HASHTAG WITH CURRENT POST
router.post("/add", async (req, res) => {
    if (!checkBody(req.body, ['hashtag', 'postId'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    const foundHashtag = await Hashtag.findOne({ name: req.body.hashtag });
    if (!foundHashtag) {
        //hashtag does not exist
        const newHashtag = new Hashtag({ name: req.body.hashtag, posts: [req.body.postId] })
        newHashtag.save();
        res.json({ result: true, message: 'created new Hashtag', newHashtag })
    } else {
        //hashtag does already exist
        if (!foundHashtag.posts.includes(req.body.postId)) {
            foundHashtag.posts.push(req.body.postId)
            foundHashtag.save();
            res.json({ result: true, message: 'added to hashtag', foundHashtag });
        } else {
            res.json({ result: true, message: 'Post is already in this hashtag', foundHashtag });
        }
    }
});




module.exports = router;