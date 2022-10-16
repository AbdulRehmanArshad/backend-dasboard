const express = require('express')
const loginUser = require('./login-user')
const registerUser = require('./register-user')
const router = express.Router()

module.exports = () => {
    router.post("/login", loginUser) // localhost:4000/user/login
    router.post("/register", registerUser) // localhost:4000/user/login
    return router
}