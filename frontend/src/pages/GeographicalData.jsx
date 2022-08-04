import React, { useEffect, useState } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../features/country/countrySlice'
import Spinner from '../components/Spinner'

import 'mapbox-gl/dist/mapbox-gl.css'
import Map from 'react-map-gl'

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

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='geographical-data'>
        <div className="heading">
            <FaSearchLocation className='icon' />
            <h1>Client Geographical Data</h1>
        </div>

        <Map 
            mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
            initialViewState={{
                longitude: -122.4,
                latitude: 37.8,
                zoom: 14
            }}
            style={{width: "100%", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        />
    </section>
  )
}

export default GeographicalData