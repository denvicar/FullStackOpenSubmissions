import React from "react";
import Weather from "./Weather"

const CountryDetail = ({country})=>{
    if(!!country) {

    return  (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(l=><li key={l[0]}>{l[1]}</li>)}
            </ul>

            <img src={country.flags.png} alt="flag" />

            <Weather capital={country.capital[0]} />
            {/* <h2>Weather in {country.capital[0]}</h2>
            <p><strong>temperature:</strong> {weather.current.temperature} Celsius</p>
            <img src={weather.current.weatherIcons[0]} alt="icon" />
            <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p> */}
        </div>
    )
        } else return <p></p>
}

export default CountryDetail