//MongoDB Schema for users
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Users = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password:{
        type: String,
        required: true
    }
})

//hash password 
Users.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
        if (err){
            return next(err);
        }

        user.password = hash;
        next()
    })
})

Users.statics.authenticate = function (email,password, callback){
    User.findOne({ email: email })
    .exec(function (err,user){
        if(err){
            return callback(err)
        }

        else if(!user){
            var err = new Error('User not found');
            err.status = 401;
            return callback(err);
        }

        bcrypt.compare(password, user.password, function(err, result){
            if(result === true)
            {
                return callback(null,user);
            }

            else{
                return callback();
            }
        })
    });
}

var User = mongoose.model('User', Users);
module.exports = User;