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

const enquiryService = {
    getAllEnquiries,
    uploadEnquiry
}

export default enquiryService