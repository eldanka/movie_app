const jwt = require('jsonwebtoken')
const config = require('../config')

function generateToken(id, username){
    return jwt.sign({ id, username}, config.secret)
}

module.exports = generateToken