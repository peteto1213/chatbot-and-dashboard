const express = require('express')
const asyncHandler = require('express-async-handler')
const Country = require('../models/countryModel')

/**
 * @author Pete To
 * @description Get all countries from database
 * @router GET /api/country
 * @access Public
 */
const getAllCountries = asyncHandler(async (req, res) => {
    const countries = await Country.find()

    res.status(200).json(countries)
})

/**
 * @author Pete To
 * @description create a new country
 * @router POST /api/country
 * @access Public
 */
const createCountry = asyncHandler(async (req, res) => {
    //check if there is any missing field(s)
    if(!req.body.countryName || !req.body.countryISO || !req.body.clientPopulation || !req.body.latitude || !req.body.longitude){
        res.status(400)
        throw new Error("Please complete all the requried fields")
    }

    const country = await Country.create({
        countryName: req.body.countryName,
        countryISO: req.body.countryISO,
        clientPopulation: req.body.clientPopulation,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })

    res.status(200).json(country)
})

module.exports = {
    getAllCountries,
    createCountry
}