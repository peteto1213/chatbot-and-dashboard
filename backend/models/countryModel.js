const mongoose = require('mongoose')

const countrySchema = mongoose.Schema({
    countryName: {
        type: String,
        required: true,
        unique: true
    },
    countryISO: {
        type: String,
        required: true,
        unique: true
    },
    clientPopulation: {
        type: Number,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Country', countrySchema)