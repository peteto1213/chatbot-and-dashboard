import axios from "axios";

const COUNTRY_API = "https://nodejs-chatbot-backend.herokuapp.com/api/country"

//get all countries
const getAllCountries = async() => {
    const response = await axios.get(COUNTRY_API)

    return response.data
}

const countryService = {
    getAllCountries
}

export default countryService