const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

const port = process.env.PORT || 8080

//connect to the database while server.js starts
connectDB()

//get the body of the request in json format for middleware layer
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route of different collections


app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

