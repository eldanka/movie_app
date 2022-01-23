const express = require('express')
const { getMovies, getMovieById, rateMovie, getRating} = require('../controllers/movieController')

const router = express.Router()

router.route('/').get(getMovies)
router.route('/:id').get(getMovieById)
router.route('/:id/rating').post(rateMovie).get(getRating)

module.exports = router