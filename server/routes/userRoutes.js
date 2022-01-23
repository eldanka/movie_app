const express = require('express')
const { authUser, registerUser, googleAuth } = require('../controllers/userController')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/googleAuth').post(googleAuth)

module.exports = router