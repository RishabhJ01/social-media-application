var express = require('express');
var router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const { isLoggedIn } = require("./common")



const upload = multer({
    storage: multer.diskStorage({
        destination: function(req,res,cb){
            cb(null, "./public/uploads/");
        },
        filename: function(req,res,cb){
            const filename = res.fieldname+ "-" + req.user.username+Date.now().toString()+'.jpg'
            const location = `/uploads/${filename}`;
            req.location = location;
            cb(null, filename);
        }
    })
});

router.get('/:username', isLoggedIn , function(req,res,next){
    res.locals.filter = null;
    res.render('profile', {user: req.user});
})

router.post('/:username', upload.single('user-image'), function(req,res,next){
    User.findById(req.user._id, function(err,user){
        user.user_image = req.location;
        req.user = user;
        user.save();
    })
    res.render('profile', {user: req.user});
})


module.exports = router;