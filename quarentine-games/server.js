if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './.env'})
  }

const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');

var app = express();

var bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const reviewRouter = require('./routes/review');
const genreRouter = require('./routes/genre');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//Connect to mongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to Mongoose"))


app.use('/', indexRouter)
app.use('/review', reviewRouter)
app.use('/genre', genreRouter)

app.listen(process.env.PORT || 8080)
