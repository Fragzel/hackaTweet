const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    content: { type: String, required: true },
    creationDate: { type: Date, required: true, default: Date.now() },
    likedCount: { type: Number, required: false, default: 0 },
});

const Post = mongoose.model('posts', postSchema);

module.exports = Post;
