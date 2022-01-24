const Movie = require('../models/movieModel')

function sortData(movies, tvShows){
    for( let i = 0; i < movies.length; i++){
        movies[i].avgRating = movies[i].rating
            .map((movie) => movie.rating)
            .reduce((a, b) => a +b, 0) / movies[i].rating.length
        }
        movies.sort((a,b) => b.avgRating - a.avgRating)
        for( let i = 0; i < tvShows.length; i++){
            tvShows[i].avgRating = tvShows[i].rating
                .map((tvShows) => tvShows.rating)
                .reduce((a, b) => a +b, 0) / tvShows[i].rating.length
        }
        tvShows.sort((a,b) => b.avgRating - a.avgRating)
        return movies, tvShows
}

async function getMovies(req, res){
    try {
        const word = req.query.keyword.toLowerCase()       
        if(word.includes('after 2015')){
            const movies = await Movie.find({realeaseDate: {$gte: 2015} , isMovie: true }) 
            const tvShows = await Movie.find({realeaseDate: {$gte: 2015} , isMovie: false })
            sortData(movies, tvShows)
            return res.json({movies, tvShows})
        }
        if(word.includes('5 stars')){
            let movies = await Movie.find({isMovie: true }) 
            let tvShows = await Movie.find({isMovie: false })
            sortData(movies, tvShows)
            movies = movies.filter((movie) => {return movie.avgRating === 5})
            tvShows = tvShows.filter((tvShow) => {return tvShow.avgRating === 5})
            return res.json({movies, tvShows})
        }
        if(word.includes('more') && word.includes('4') && word.includes('stars')){
            let movies = await Movie.find({isMovie: true }) 
            let tvShows = await Movie.find({isMovie: false })
            sortData(movies, tvShows)
            movies = movies.filter((movie) => {return movie.avgRating >= 4})
            tvShows = tvShows.filter((tvShow) => {return tvShow.avgRating >= 4})
            return res.json({movies, tvShows})
        }
        if(word.includes('nineties') || word.includes('90`s')){
            const movies = await Movie.find({realeaseDate: {$lte: 1999, $gte: 1990} , isMovie: true }) 
            const tvShows = await Movie.find({realeaseDate: {$lte: 1999, $gte: 1990} , isMovie: false })
            sortData(movies, tvShows)
            return res.json({movies, tvShows})
        }
        if(word.includes('eighties') || word.includes('80`s')){
            const movies = await Movie.find({realeaseDate: {$lte: 1989, $gte: 1980} , isMovie: true }) 
            const tvShows = await Movie.find({realeaseDate: {$lte: 1989, $gte: 1980} , isMovie: false })
            sortData(movies, tvShows)
            return res.json({movies, tvShows})
        }
        if(word.includes('older') && word.includes('5') && word.includes('years')){
            const movies = await Movie.find({realeaseDate: {$lte: 2017} , isMovie: true }) 
            const tvShows = await Movie.find({realeaseDate: {$lte: 2017} , isMovie: false })
            sortData(movies, tvShows)
            return res.json({movies, tvShows})
        }
        if(word.includes('least') && word.includes('3') && word.includes('stars')){
            let movies = await Movie.find({isMovie: true }) 
            let tvShows = await Movie.find({isMovie: false })
            sortData(movies, tvShows)
            movies = movies.filter((movie) => {return  movie.avgRating >= 3})
            tvShows = tvShows.filter((tvShow) => {return tvShow.avgRating >= 3})
            return res.json({movies, tvShows})
        }else{
            const movies = await Movie.find({$or: [{ title: { $regex: req.query.keyword, $options: "i"} }, { cast: { $regex: req.query.keyword, $options: "i"} }], isMovie: true }) 
            const tvShows = await Movie.find({$or: [{ title: { $regex: req.query.keyword, $options: "i"} }, { cast: { $regex: req.query.keyword, $options: "i"} }], isMovie: false })
            sortData(movies, tvShows)
            return res.json({movies, tvShows})
        }
         
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function getMovieById(req, res){
    try {
        const movie = await Movie.findById(req.params.id)

        if(movie){
            res.json(movie)
        }else {
            res.status(404).json({ message: 'Movie not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
 
async function rateMovie(req, res){
    const stars = req.body.newRating
    try {
        const movie = await Movie.findById(req.body.id)

        if(movie){
            const rating = {
                rating: stars
            }
            movie.rating.push(rating)
        }
        await movie.save()
        res.json({ message : `Movie rated with ${stars} stars`})
    } catch (error) {
        console.log(error)
    }
}

async function getRating(req, res){
    try {
        const movie = await Movie.findById(req.params.id)
        res.json(movie.rating)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getMovies,
    getMovieById,
    rateMovie,
    getRating
}