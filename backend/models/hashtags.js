const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    name: { type: String, required: true },
    posts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }], required: true, default: [] }
});

const Hashtag = mongoose.model('hashtags', hashtagSchema);

module.exports = Hashtag;
