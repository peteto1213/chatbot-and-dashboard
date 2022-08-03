const mongoose = require('mongoose')

const enquirySchema = mongoose.Schema({
    clientNickname: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    questionCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'QuestionCategory'
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Country'
    }
},{
    timestamps: true,
}
)

module.exports = mongoose.model('Enquiry', enquirySchema)