//Create Schema 

const mongoose = require('mongoose')
const coverImageBasePath = 'uploads/reviewCovers'//Target for uploaded files 

const reviewSchema = new mongoose.Schema({
    title: {
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
        default: Date.now
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
module.exports.coverImageBasePath = coverImageBasePath