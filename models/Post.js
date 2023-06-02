const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    subject: String,
    context: String,
    postByid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postbyuser: {
        type: String,
        ref: "User"
    },
    like: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    dislike: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
}, {timestamps: true},
{collection: "Post"})

module.exports = mongoose.model('Post', PostSchema);