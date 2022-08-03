const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')

const app = express()

const port = process.env.PORT || 8080

//connect to the database while server.js starts
connectDB()

//get the body of the request in json format for middleware layer
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//overriding erroring handling in Express.js
app.use(errorHandler)

//routes of different collections
app.use('/api/enquiry', require('./routes/enquiryRoutes'))
app.use('/api/questionCategory', require('./routes/questionCategoryRoutes'))
app.use('/api/country', require('./routes/countryRoutes'))


// message to show that the REST API is running
app.get('/', (req, res) => {
    res.send('APP IS RUNNING')
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})

