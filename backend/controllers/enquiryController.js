const asyncHandler = require('express-async-handler')
const Enquiry = require('../models/enquiryModel')
const Country = require('../models/countryModel')
const QuestionCategory = require('../models/questionCategoryModel')

/**
 * @author Pete To
 * @description Get all enquiries from database
 * @router GET /api/enquiry
 * @access Public
 */
const getAllEnquiries = asyncHandler(async (req, res) => {
    const enquiries = await Enquiry.find()
                            .populate('questionCategory', 'categoryName')
                            .populate('country', 'countryISO clientPopulation latitude longitude')
    
    res.status(200).json(enquiries)
})

/**
 * @author Pete To
 * @description upload an enquiry
 * @router POST /api/enquiry
 * @access Public
 */
const uploadEnquiry = asyncHandler(async (req, res) => {
    if(req.body.clientNickname || req.body.question || req.body.questionCategory || req.body.country){
        res.status(400)
        throw new Error("Please complete all the required fields")
    }

    const enquiry = await Enquiry.create({
        clientNickname: req.body.clientNickname,
        question: req.body.question,
        questionCategory: req.body.questionCategory,
        country: req.body.country
    })

    res.status(200).json(enquiry)
})

/**
 * @author Pete To
 * @description Get enquiries by question category id
 * @router GET /api/enquiry/questionCategory/:id
 * @access Public
 */
const getEnquiriesByQuestionCategoryId = asyncHandler(async (req, res) => {
    //check if the id is passed or not
    if(!req.params.id){
        res.status(400)
        throw new Error('Please pass a category id to search for enquiries')
    }

    //check if the question category exists or not
    const questionCategory = await QuestionCategory.findById(req.params.id)
    if(!questionCategory){
        res.status(404)
        throw new Error('Question Category not found')
    }

    const enquiries = await Enquiry.find({questionCategory: req.params.id})

    //check if any enquiries found
    if(!enquiries){
        res.status(200).json("No client enquiries record found for this question category")
    }

    res.status(200).json(enquiries)
})

/**
 * @author Pete To
 * @description Get enquiries by country id
 * @router GET /api/enquiry/country/:id
 * @access Public
 */
const getEnquiriesByCountryId = asyncHandler(async (req, res) => {
    //check if the id is passed or not
    if(!req.params.id){
        res.status(400)
        throw new Error('Please pass a category id to search for enquiries')
    }

    //check if the country exists or not
    const country = await Country.findById(req.params.id)
    if(!country){
        res.status(404)
        throw new Error('Country not found')
    }

    const enquiries = await Enquiry.find({country: req.params.id})

    //check if any enquiries found
    if(!enquiries){
        res.status(200).json("No client enquiries record found for this country")
    }

    res.status(200).json(enquiries)
})

module.exports = {
    getAllEnquiries,
    uploadEnquiry,
    getEnquiriesByQuestionCategoryId,
    getEnquiriesByCountryId
}