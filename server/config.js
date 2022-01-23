require('dotenv').config({ path: './.env'})

config = {
    port: process.env.PORT || 5000,
    mongo: process.env.MONGO || 'mongodb+srv://Eldan:Ajla2208@cluster0.s1t9x.mongodb.net/movie_app?retryWrites=true&w=majority',
    secret: process.env.JWT_SECRET || 'mistralfullstack'
}

module.exports = config