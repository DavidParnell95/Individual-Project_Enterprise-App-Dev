const express = require('express')
const router = express.Router();

router.get('/', function(req,res){
    res.render('index.ejs')
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', (req,res) =>{

});

router.get('/register', (req,res) =>{
    res.render('register.ejs');
});


module.exports = router