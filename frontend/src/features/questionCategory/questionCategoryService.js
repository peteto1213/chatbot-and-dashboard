import axios from "axios";

const QUESTION_CATEGORY_API = '/api/questionCategory'

//get all question categories
const getAllQuestionCategories = async() => {
    const response = await axios.get(QUESTION_CATEGORY_API)

    return response.data
}

const questionCategoryService = {
    getAllQuestionCategories,
}

export default questionCategoryService