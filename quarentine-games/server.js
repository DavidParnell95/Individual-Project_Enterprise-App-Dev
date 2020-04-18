'use strict';
var express = require('express');
var mongoose = require('mongoose');
var sessions = require('express-session');
var MongoStore = require('connect-mongo')(session);

var app = express();

var bodyParser = require('body-parser');

//connect to Mongo
mongoose.connect('mongodb://localhost/testForAuth');
var db = mongoose.connection;

db.on('error', console.error.bind(console,'connection error'));
db.once('open', function(){

});

//user sessions for auth tracking 
app.use(sessions({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parse in-requsts
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Create handlebars with default layout
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname+ '/public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req,res, next){
    res.render('home', {
        layout: 'main'}
    ); 
});

//Create review
app.post('/new', function(req, res,next){
    console.log(req.body);//Print req body to console
    //TO DO: implement add to DB 

    res.render('new');
});


const saltRounds =10;

//Login 
app.post('/login', function(req, res,next){
    console.log(req.body);//Print req body to console
    //TO DO: implement log in and set up UI

    res.render('login');
});

//Register
app.post('/register', function(req, res,next){
    console.log(req.body);//Print req body to console
    //TO DO: implement add to Auth 

    
});

//Handle Errors
//404 not found
app.use(function(req,res,){
    res.status(404);
    res.render('404');
});

//500 Server error
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render(500);
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' +app.get('port'));
})
