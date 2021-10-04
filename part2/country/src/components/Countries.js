import React from 'react'
//import Country from "./Country";
import CountryDetails from "./CountryDetails";

const Countries = (prop) => {
    if(prop.filteredCountries.length !== 1){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }else if(prop.filteredCountries.length === 1){
        console.log(prop.filteredCountries)
        return (
            <div>
                <CountryDetails filteredCountries={prop.filteredCountries[0]} />
            </div>
        )
    }else{
        return (
            <div></div>
        )
    }

}

export default Countries