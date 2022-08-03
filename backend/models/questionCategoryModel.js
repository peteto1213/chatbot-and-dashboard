const mongoose = require('mongoose')

const questionCategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('QuestionCategory', questionCategorySchema)