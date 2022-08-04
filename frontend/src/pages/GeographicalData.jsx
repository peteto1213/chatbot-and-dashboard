import React, { useEffect } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../features/country/countrySlice'
import Spinner from '../components/Spinner'


function GeographicalData() {

    const dispatch = useDispatch()
    const { countries, isLoading, isError, message } = useSelector((state) => state.country)

    // Fetch all the countries and related details
    useEffect(() => {
        dispatch(getAllCountries())

        if(isError){
            alert(message)
        }

    }, [])

    console.log(countries);

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='geographical-data'>
        <div className="heading">
            <FaSearchLocation className='icon' />
            <h1>Client Geographical Data</h1>
        </div>

        <div className="map-container">
            
        </div>
    </section>
  )
}

export default GeographicalData