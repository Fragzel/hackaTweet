
var express = require('express');
var router = express.Router();

require('../models/connection');


// VIEW ALL POST WITH THIS # A tester, piti doute
router.get("/hashtags/:hashtag", async (req, res) => {

    const foundHashtagsPosts = await Hashtag.find({ name: req.params.hashtag })
    if (foundHashtagsPosts.length) {
        res.send({ result: true, allHashtagsPost: foundHashtagsPosts })
    } else {
        res.send({ result: false, error: "Aucun post trouvé avec ce Hashtag ! " })
    }
});



module.exports = router;