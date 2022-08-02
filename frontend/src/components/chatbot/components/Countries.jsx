import React, { useEffect } from 'react'

function Countries(props) {
    const { state, setState } = props

    //Fetch countries data from own RESTful API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const firstFive = data.slice(0, 6)
        setState(state => ({ ...state, countries: firstFive}))
      })
  }, []);

  //Handle client's response of country choice
  const setCountry = (countryId) => {
    //update state
    setState((state) => ({...state, country: countryId}))

    //notify results
    props.actionProvider.notifyResults()
  }

  //Render according to number of countries from database
  const renderCountries = () => {
    return state.countries.map((country) =>
        <li key={country.id} className="country" onClick={() => {setCountry(country.id)}}>
            {country.name}
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