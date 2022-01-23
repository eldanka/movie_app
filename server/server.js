const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')

async function connectDB(){
    try {
        const connect = await mongoose.connect(config.mongo, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected on ${config.mongo}`)
    } catch (error) {
        console.log(`Erorr: ${error.message}`)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/movies', movieRoutes)

app.listen(
    config.port,
    console.log(`Server running on ${config.port} port`)
)