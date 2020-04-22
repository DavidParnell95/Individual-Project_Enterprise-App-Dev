const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const Review = require('../models/review')
const Genre = require('../models/genre')
const saltRounds = 10

// Get All Reviews
router.get('/', async (req, res) => {
    try {
      const review = await Review.find({})
      res.render('index', {
        reviews: review
      })
    } catch {
      res.redirect('index.ejs')
    }
  })

var db = require('../models/user');

router.use(express.urlencoded({extended: false}))

router.get('/', function(req,res){
    res.render('index.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', function(req,res){
    db.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user){
        if(!user){
            res.redirect('/')
        }

        else{
            bcrypt.compare(req.body.password, user.password, function(err,
                result){
                    console.log(user)
                    if(result == true)
                    {
                        res.redirect('genre');
                    }

                    else{
                        res.send('Incorrect username or password');
                        res.redirect('/');
                    }
                })
        }
    })
});

router.get('/register', (req,res) =>{
    res.render('register.ejs');
});

//Regiser user, store uname, password and email then redir 
router.post('/register', function(res,req){
    console.log(req.body)

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        db.User.create({
            username: req.body.username, 
            email: req.body.email,
            password: hash
        }).then(function(data){
            if(data)
            {
                res.redirect('/');
            }
        })
    })

})



module.exports = router