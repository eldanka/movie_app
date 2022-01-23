const Movie = require('../models/movieModel')
const mongoose = require('mongoose')
const config = require('../config')
const request = require('request')

mongoose.connect(config.mongo, { useNewUrlParser: true, useUnifiedTopology: true })

var tvShows = []
var tvShowsOptions = {
    'method': 'GET',
    'url': 'https://imdb-api.com/en/API/Top250TVs/k_gz76kxnz',
    'headers': {}
}
const descritpion = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id elit orci. Sed suscipit tellus urna, quis aliquet odio blandit in. Nam sed euismod ante. Nam elementum elementum eros, ut egestas libero vulputate non. Donec at justo ac magna facilisis rhoncus sit amet eu justo. Fusce vulputate ac elit facilisis aliquam.'



request(tvShowsOptions, function(error, response){
    if(error) throw new Error(error)
    let res = JSON.parse(response.body).items.slice(0, 100)
    for(let i = 0; i < res.length; i++){
        tvShows.push(
            new Movie({
                title: res[i].title,
                description: descritpion,
                cover: res[i].image,
                cast: res[i].crew.split(", "),
                realeaseDate: res[i].year,
                isMovie: false,
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

    for( let i = 0; i < tvShows.length; i++){
        tvShows[i].save(function(error, res) {
            done++
            if(done === tvShows.length) exit()
        })
        console.log('TvShows are seeding in mongodb...')
    }
})

function exit() {
    mongoose.disconnect()
    console.log('MongoDB seeding finished!')
}