const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const mongoose = require('mongoose')

async function authUser(req, res){
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        const matchPassword = await existingUser.matchPassword(password)
        if(existingUser && matchPassword){
            res.json({ token: generateToken(existingUser._id, existingUser.username)})
        }else {
            res.status(401).json({ message: 'Invalid Credencials' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

async function registerUser(req, res){
    const { username, email, password } = req.body
    try {
        const emailExist = await User.findOne({ email })
        const usernameExist = await User.findOne({ username })
        if(emailExist){
            return res.status(400).json({ message: 'User with this email already exists'})
        }
        if(usernameExist){
            return res.status(400).json({ message: 'User with this username already exists'})
        }

        const user = await User.create({
            username,
            email,
            password
        })

        if(user){
            res.json({ message: 'Successfull Registred!'})
        }else {
            res.status(400).json({ message: 'Invalid user data'})
        }
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

async function googleAuth(req, res){
    const { googleId, email, name } = req.body.googleRes.profileObj
    const token  = req.body.googleRes.accessToken
    const username = name
    try {
        const existingUser = await User.findOne({ email })
        if(existingUser){
            res.json({ token: token, userId: existingUser._id})
        }else if(!existingUser){
            const user = await User.create({
                username,
                email,
            })
            if(user) res.json({ token: token, userId: user._id})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { authUser, registerUser, googleAuth }