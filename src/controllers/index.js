const express = require('express')
const user = require('./users')
const router = express.Router()

module.exports = () => {
    router.use("/user", user())
    return router
}