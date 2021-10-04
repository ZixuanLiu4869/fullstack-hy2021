import React, {useState, useEffect} from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";

const Weather = ({capital}) => {
    const [weatherInfo, setWeatherInfo] = useState({})
    const [hasInfo, setHasInfo] = useState(false)

    const access_key = process.env.REACT_APP_API_KEY

    console.log(capital)

    const params = {
        access_key: access_key,
        query: capital
    } 

    const getWeatherInfo = () => {
        axios.get('http://api.weatherstack.com/current',{params:params,}).then(response => {
            setWeatherInfo(response.data)
            setHasInfo(true)
        })
    }

    useEffect(getWeatherInfo, [])

    return(
        <div>
            {hasInfo && <WeatherInfo weatherInfo={weatherInfo} />}
        </div>
    )
}

export default Weather