const express = require('express')
const { getAllEnquiries, uploadEnquiry, getEnquiriesByQuestionCategoryId, getEnquiriesByCountryId } = require('../controllers/enquiryController')

const router = express.Router()

//Get all enquiries
router.get('/', getAllEnquiries)

//Upload an enquiry
router.post('/', uploadEnquiry)

//Get enquiries by question category id
router.get('/questionCategory/:id', getEnquiriesByQuestionCategoryId)

//Get enquiries by country id
router.get('/country/:id', getEnquiriesByCountryId)

module.exports = router