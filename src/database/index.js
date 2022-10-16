const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
    try {
        mongoose.connect(process.env.DB_CONNECT,
            () => console.log('Connected to database!'))
    } catch (error) {
        return error
    }
}