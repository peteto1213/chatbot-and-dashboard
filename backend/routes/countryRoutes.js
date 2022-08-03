const express = require('express')
const { getAllCountries, createCountry } = require('../controllers/countryController')

const router = express.Router()

//get all countries
router.get('/', getAllCountries)

//create a new country
router.post('/', createCountry)


module.exports = router