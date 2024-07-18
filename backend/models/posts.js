const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now() },
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
