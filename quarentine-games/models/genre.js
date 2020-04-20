const mongoose = require('mongoose')
const Review = require('./review')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

genreSchema.pre('remove', function(next){
    Review.find({ genre: this.id}, (err, reviews) => {
        if(err)
        {
            next(err)
        }

        else if(reviews.length >0)
        {
            next(new Error('This genre still has games'))
        }

        else{
            next()
        }
    })
})

module.exports = mongoose.model('Genre', genreSchema)