var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post('/signup',
  check('username')
  .isLength({min:5}).withMessage('must be at least 3 chars long')
  .custom(value => {
    return User.findByUsername(value).then(user => {
      if(user){
        return Promise.reject('username already in use');
      }
    })
  }),
  check('password')
    .isLength({min:5})
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
 async (req,res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
    }
    const user = await User.register({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      post: new Array,
    }, req.body.password);
    if(user){
      passport.authenticate('local')(req,res,function(){
        res.redirect('/');
      })
    }else{
      res.redirect('signup')
    }
  } catch(err){
    res.send(err);
  }
})

router.post("/login/password", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))


router.get('/login', function(req,res,next){
  res.render('login');
})

router.get('/signup', function(req,res,next){
  res.render('signup');
})

router.post('/logout', function(req,res,next){
  req.logout(function(err){
    if(err) {return next(err);}

    res.redirect('/');
  })
})


module.exports = router;

// username - rishabhj01
//password - Rishabh@1234

// username - testuser
// password - testtest