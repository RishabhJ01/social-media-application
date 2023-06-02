const Post = require('../models/Post');
const mongoose = require("mongoose");
const Comment = require("../models/Comment");

function isLoggedIn(req,res,next){
    if(!req.user){
        return res.redirect('login')
    }
    next();
}

function CreateComment(req,res,next){
    const userid = req.user._id;
    const postid = mongoose.Types.ObjectId(req.body._id);
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        commentOn: postid,
        commentBy: userid,
        commentByUser: req.user.username,
        body: req.body.body,
        like: new Array,
        dislike: new Array,
    });
    comment.save();
    req.newComment = comment;
    Post.findById(postid, function(req,post){
        post.comment.push(comment);
        post.save();
        next();
    })
}
function LikeDislike(req,res,next){
    let postId = mongoose.Types.ObjectId(req.body._id);
    let userId = req.user._id;
    Post.findById(postId, function(err, post){
        var index1 = post.like.indexOf(userId);
        var index2 = post.dislike.indexOf(userId);
        if(req.body.type === 'LIKE'){
            if(index1 !== -1){
                post.like.splice(index1,1);
            }
            else{
                if(index2 !== -1){
                    post.dislike.splice(index2,1);
                }
                post.like.push(userId);
            }
        } else{
            if(index2 !== -1){
                post.dislike.splice(index2,1);
            }
            else{
                if(index1 !== -1){
                    post.like.splice(index1,1);
                }
                post.dislike.push(userId);
            }
        }
        post.save();

        req.count = {
            likes: post.like.length,
            dislikes: post.dislike.length
        }

        next();
    })
}

function getPostAndComments(req,res,next){
    const postid = mongoose.Types.ObjectId(req.params.id);
    
    Post.findOne({_id: postid}).populate('comment').exec((err, post) => {
        console.log(post);
        res.locals.selectedPost = post;
        next();
    })
}

module.exports = {isLoggedIn, CreateComment, LikeDislike, getPostAndComments};