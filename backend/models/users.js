const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    likedPosts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }], required: true, default: [] }
});

const User = mongoose.model('users', userSchema);

module.exports = User;