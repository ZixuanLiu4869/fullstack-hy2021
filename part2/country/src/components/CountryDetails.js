import React from 'react'

const CountryDetails = ({filteredCountries}) => {
    return (
        <div>
            <h1>{filteredCountries.name.common}</h1>
            <p>capital {filteredCountries.capital}</p>
            <p>population {filteredCountries.population}</p>
            <div>
                <h2>Spoken languages</h2>
            </div>
        </div>
    )
}

export default CountryDetails