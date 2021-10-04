import React, {useState} from "react"
import CountryDetails from "./CountryDetails";

const Button = ({onClick, text}) => (
    <button onClick={onClick}>{text}</button>
)

const Country = (country) => {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show)
    }
    console.log(country)

    return(
        <div>
            <li>{country.country.name} <Button onClick={handleClick} text="show" /></li>
            <div>
                {show ? <CountryDetails filteredCountries={country.country}/> : ''}
            </div>
        </div>
    )

}

export default Country