var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var User = require("../models/User")

const { isLoggedIn } = require("./common");
/* GET home page. */
router.get('/', isLoggedIn , function(req,res,next){
  Post.find({postbyuser: req.user.username}, function(err,posts){
    res.locals.posts = posts.reverse();
    next();
  })
}, function(req,res,next){
  res.locals.filter = null;
  res.render('index', {user:req.user})
});

router.get('/profile', isLoggedIn , function(req,res,next){
  res.locals.filter = null;
  res.render('profile', {user: req.user});
})
module.exports = router;
