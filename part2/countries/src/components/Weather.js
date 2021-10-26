import React, {useEffect,useState} from 'react'
import axios from 'axios'

const Weather = ({capital}) => {
    const [weather,setWeather] = useState()
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(()=>{
        if(!!capital) {
            axios
                .get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`)
                .then(res=>setWeather(res.data))
        }
    })
    if (!!weather)
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p><strong>temperature:</strong> {weather.current.temperature} Celsius</p>
                <img src={weather.current.weather_icons[0]} alt="icons" />
                <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        )
    else return <></>
}

export default Weather