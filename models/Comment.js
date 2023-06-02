const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    commentOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    commentByUser: {
        type: String,
        ref: "User"
    },
    body: String,
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    dislike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, {timestamps: true},
{collection: "Comment"});

module.exports = mongoose.model('Comment', CommentSchema);