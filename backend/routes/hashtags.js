
var express = require('express');
var router = express.Router();
const Hashtag = require('../models/hashtags')

const { checkBody } = require('../modules/tools');

require('../models/connection');


// VIEW ALL POST WITH THIS HASHTAG
router.get("/all", async (req, res) => {

    const foundHashtagsPosts = await Hashtag.find({ name: req.body.hashtag })
    if (foundHashtagsPosts.length) {
        res.send({ result: true, allHashtagPosts: foundHashtagsPosts })
    } else {
        res.send({ result: false, error: "Aucun post trouvé avec ce Hashtag ! " })
    }
});


// ADD NEW HASHTAG
router.post("/add", async (req, res) => {
    if (!checkBody(req.body, ['hashtag'])) {
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    const foundHashtag = await Hashtag.findOne({ name: req.body.hashtag });
    if (!foundHashtag) {
        const newHashtag = new Hashtag({ name: req.body.hashtag, posts: [] })
        newHashtag.save();
        res.json({ result: true, foundHashtag })
    } else {
        res.json({ result: true, message: 'added to hashtag' })
    }
});


module.exports = router;