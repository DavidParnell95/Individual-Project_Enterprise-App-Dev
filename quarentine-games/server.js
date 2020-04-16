'use strict';
var express = require('express');
var app = express();

//Create handlebars with default layout
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname+ '/public'));

app.get('/', function(req,res, next){
    res.render('home', {
        layout: 'main',
    });
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