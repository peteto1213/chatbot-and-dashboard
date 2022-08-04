import React, { useEffect, useState, useMemo } from 'react'
import { FaSearchLocation } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../features/country/countrySlice'
import Spinner from '../components/Spinner'

import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl'
import markerImage from '../resources/mapMarker.png'

function GeographicalData() {

    const dispatch = useDispatch()
    const { countries, isLoading, isError, message } = useSelector((state) => state.country)

    const [viewState, setViewState] = React.useState({
        longitude: -100,
        latitude: 40,
        zoom: 1.5
    })
    const [popupInfo, setPopupInfo] = useState(null)

    // Fetch all the countries and related details
    useEffect(() => {
        dispatch(getAllCountries())

        if(isError){
            alert(message)
        }

    }, [])

    //Mark all countries on the map (MEMO)
    const pins = useMemo(
    () =>
      countries.map((country, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={country.longitude}
          latitude={country.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation()
            setPopupInfo(country)
          }}
        >
            <img 
                className='marker-image'
                src={markerImage} 
                style={{width: "50px", height: "45px", cursor: "pointer", }}
            />
        </Marker>
      )),
    [countries]
  );

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
            {...viewState}
            onMove={event => setViewState(event.viewState)}
            style={{width: "100%", height: "100vh"}}
            mapStyle="mapbox://styles/mapbox/light-v10"
        >
            {/* Map control options */}
            <GeolocateControl position="top-left" />
            <FullscreenControl position="top-left" />
            <NavigationControl position="top-left" />
            <ScaleControl />

            {/* Mark all countries on the map */}
            {pins}

            {/* Show the information related to each country when clicked */}
            {
                popupInfo && (
                    <Popup
                        anchor='top'
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className='info'>
                            <h3 className='title'>{popupInfo.countryName}({popupInfo.countryISO})</h3>
                            <p className='population'>Client population: {popupInfo.clientPopulation}</p>
                        </div>
                    </Popup>
                )
            }
        </Map>
    </section>
  )
}

export default GeographicalData