const express = require('express')
const { getAllQuestionCategories, createQuestionCategory } = require('../controllers/questionCategoryController')

const router = express.Router()

//Get all question categories
router.get('/', getAllQuestionCategories)

//Create a new question category
router.post('/', createQuestionCategory)





module.exports = router