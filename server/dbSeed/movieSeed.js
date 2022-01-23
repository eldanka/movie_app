const Movie = require('../models/movieModel')
const mongoose = require('mongoose')
const config = require('../config')
const request = require('request')

mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true })

var movies = []
var movieOptions = {
    'method': 'GET',
    'url': 'https://imdb-api.com/en/API/Top250Movies/k_gz76kxnz',
    'headers': {}
}
const descritpion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit orci. Sed suscipit tellus urna, quis aliquet odio blandit in. Nam sed euismod ante. Nam elementum elementum eros, ut egestas libero vulputate non. Donec at justo ac magna facilisis rhoncus sit amet eu justo. Fusce vulputate ac elit facilisis aliquam.'


request(movieOptions, function(error, response){
    if(error) throw new Error(error)
    let res = JSON.parse(response.body).items.slice(0, 100)
    for(let i = 0; i < res.length; i++){
        movies.push(
            new Movie({
                title: res[i].title,
                description: descritpion,
                cover: res[i].image,
                cast: res[i].crew.split(", ").slice(1,3),
                realeaseDate: res[i].year,
                isMovie: true,
                rating : [
                    {
                        rating: Math.floor(Math.random() * 6)
                    },
                    {
                        rating: Math.floor(Math.random() * 6)
                    },
                    {
                        rating: Math.floor(Math.random() * 6)
                    }
                ]
            }))
    }
    
    let done = 0

    for( let i = 0; i < movies.length; i++){
        movies[i].save(function(error, res) {
            done++
            if(done === movies.length) exit()
        })
        console.log('Movies are seeding in mongodb...')
    }
})

function exit() {
    mongoose.disconnect()
    console.log('MongoDB seeding finished!')
}