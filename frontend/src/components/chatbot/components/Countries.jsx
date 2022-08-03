import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCountries } from '../../../features/country/countrySlice'
import { uploadEnquiry } from '../../../features/enquiry/enquirySlice'

function Countries(props) {
    const { state, setState } = props
    const dispatch = useDispatch()
    const { countries, isError, message } = useSelector((state) => state.country)
    const { newEnquiry } = useSelector((state) => state.enquiry)

    //Fetch countries data from own RESTful API
  useEffect(() => {
    dispatch(getAllCountries())

    if(isError){
      alert(message)
    }
  }, []);

  //Handle client's response of country choice
  const setCountry = (countryId) => {
    //update state
    setState((state) => ({...state, country: countryId}))
    
    //upload enquiry
    const body = {
      clientNickname: state.clientNickname,
      question: state.question,
      questionCategory: state.questionCategory,
      country: countryId
    }
    dispatch(uploadEnquiry(body))

    //notify results
    props.actionProvider.notifyResults()
  }

  //Render according to number of countries from database
  const renderCountries = () => {
    return countries.map((country) =>
        <li key={country._id} className="country" onClick={() => {setCountry(country._id)}}>
            {country.countryISO}
        </li>
    )
  }

  return (
    <div className='countries-widget'>
        <ul className="all-countries">
            {renderCountries()}
        </ul>
    </div>
  )
}

export default Countries