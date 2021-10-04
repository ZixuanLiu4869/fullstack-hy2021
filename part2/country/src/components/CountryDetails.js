import React from 'react'
import Weather from "./Weather";

const Language = ({language}) => {
    return(
        <li>{language}</li>
    )
}

const CountryDetails = ({filteredCountries}) => {
    
    return (
        <div>
            <h1>{filteredCountries.name}</h1>
            <p>capital {filteredCountries.capital}</p>
            <p>population {filteredCountries.population}</p>
            <div>
                <h2>Spoken languages</h2>
                <ul>
                    {filteredCountries.languages.map(language => 
                        <Language key={language} language={language.name} />)}
                </ul>
            </div>
            <div>
                <img src={filteredCountries.flag} style={{width: 200}}/>
            </div>
            <div>
                <Weather capital={filteredCountries.capital} />
            </div>
        </div>
    )
}

export default CountryDetails