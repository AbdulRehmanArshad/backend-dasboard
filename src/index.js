const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectionToDB = require('./database')
const routes = require('./controllers')
const app = express()
// require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.NODE_PORT || 3001

const startNodeJsServer = async () => {
    try {
        app.use(cors({ origin: true }))
        app.use(bodyParser.json())
        app.use(routes())
        await connectionToDB()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log('error in starting server', error)
    }
}

startNodeJsServer()