const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema(
    {
        raterId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating : { type: Number}
    }
)

const movieSchema = mongoose.Schema(
    {
        title: { type: String },
        cover: { type: String },
        description: { type: String },
        realeaseDate: { type: Number},
        cast: { type: Array},
        rating: [ratingSchema],
        isMovie: { type: Boolean}
    }
)

const Movie = mongoose.model('Movies', movieSchema)

module.exports = Movie