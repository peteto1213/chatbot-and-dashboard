import axios from 'axios'

const ENQUIRY_API_URL = '/api/enquiry'

//Get all enquiries through REST API
const getAllEnquiries = async() => {
    const response = await axios.get(ENQUIRY_API_URL)

    return response.data
}

//upload enquiry from client
const uploadEnquiry = async(body) => {
    const response = await axios.post(ENQUIRY_API_URL, body)

    return response.data
}

//get enquiries by question category id
const getEnquiriesByQuestionCategoryId = async(questionCategoryId) => {
    const response = await axios.get(`${ENQUIRY_API_URL}/questionCategory/${questionCategoryId}`)

    return response.data
}

//get enquiries by country id
const getEnquiriesByCountryId = async(countryId) => {
    const response = await axios.get(`${ENQUIRY_API_URL}/country/${countryId}`)

    return response.data
}

const enquiryService = {
    getAllEnquiries,
    uploadEnquiry,
    getEnquiriesByQuestionCategoryId,
    getEnquiriesByCountryId
}

export default enquiryService