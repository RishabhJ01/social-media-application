var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const Post = require('../models/Post');
const User = require("../models/User")

const {isLoggedIn, CreateComment, LikeDislike, getPostAndComments} = require("./common");

router.get('/timeline', isLoggedIn ,function(req,res,next){
    Post.find(function(err,posts){
        res.locals.posts = posts.reverse();
        next();
    })
}, function(req,res,next){
    res.locals.filter = null;
    res.render('timeline', {user: req.user});
})

router.get('/post', isLoggedIn , function(req,res,next){
    res.locals.filter = null;
    res.render('post', {user: req.user});
})

router.post('/post/submit', async (req,res) => {
    try{
        const newPost = new Post({
            _id: new mongoose.Types.ObjectId(),
            subject: req.body.subject,
            context: req.body.context,
            postByid: req.user._id,
            postbyuser: req.user.username,
            like: new Array,
            dislike: new Array,
            comment: new Array
        })
        
        const post = await newPost.save();
        User.findById(req.user._id, function(err, user){
            console.log(user);
            user.post.push(post);
            user.save();
        })
        res.redirect('/');
    } catch(err) {
        res.send(err);
    }
})

router.post("/comment", isLoggedIn, CreateComment, function(req,res,next){
    res.send({action: 'done', comment: req.newComment})
})

router.get("/:id", isLoggedIn, getPostAndComments ,function(req,res,next){
    res.locals.filter = null;
    res.render('comments', {user: req.user});
})

router.post('/like-dislike', LikeDislike ,function(req,res,next){
    return res.send({
        action: 'done',
        count: req.count
    });
})

module.exports = router;