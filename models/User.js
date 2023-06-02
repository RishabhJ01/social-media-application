const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    user_image: {
        type: String,
        default: "",
    },
    city: String,
    state: String,
    country: String,
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {timestamps: true},
{collection: 'User'})

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);

// add more details
// create profile page to show profile data
// express validator 
// create a timeline route - to check if user is logged in - make the route accessable otherwise redirect to signup
// create a post schema 