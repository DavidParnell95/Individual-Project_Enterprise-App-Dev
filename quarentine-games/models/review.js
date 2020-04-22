//Create Schema 

const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    genre: {
        //Gets genre from schema
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    },
    
    releaseDate:{
        type: Date,
        required: true
    },

    score:{
        type: Number,
        required: true
    },

    rev:{
        type: String,
        required: true
    },

    reviewed:{
        type: Date,
        required: true,
        default: Date.now//Auto get date
    },
});

module.exports = mongoose.model('Review', reviewSchema)