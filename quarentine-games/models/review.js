//Create Schema 

const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },

    Genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'genre'
    },
    
    releaseDate:{
        type: Date,
        required: true
    },

    Score:{
        type: Number,
        required: true
    },

    Review:{
        type: String,
        required: true
    },

    reviewYear:{
        type: Date,
        required: true
    },

    coverImage:{
        type: String,
        required: true
    },

    coverImageType:{
        type: String,
        required: true
    }
});

reviewSchema.virtual('coverImagePath').get(function(){
    if(this.coverImage != null && this.coverImageType)
    {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Review', reviewSchema)