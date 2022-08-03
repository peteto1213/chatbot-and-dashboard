const express = require('express')
const asyncHandler = require('express-async-handler')
const QuestionCategory = require('../models/questionCategoryModel')

/**
 * @author Pete To
 * @description Get all question categories from database
 * @router GET /api/questionCategory
 * @access Public
 */
const getAllQuestionCategories = asyncHandler(async (req, res) => {
    const questionCategories = await QuestionCategory.find()

    res.status(200).json(questionCategories)
})

/**
 * @author Pete To
 * @description Create a new question category
 * @router POST /api/questionCategory
 * @access Public
 */
const createQuestionCategory = asyncHandler(async (req, res) => {
    //check if there is any missing field
    if(!req.body.categoryName){
        res.status(400)
        throw new Error('Please add a category name')
    }

    const questionCategory = await QuestionCategory.create({
        categoryName: req.body.categoryName
    })

    res.status(200).json(questionCategory)
})

module.exports = {
    getAllQuestionCategories,
    createQuestionCategory
}