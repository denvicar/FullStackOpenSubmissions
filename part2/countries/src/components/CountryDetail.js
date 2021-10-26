import React from "react";

const CountryDetail = ({country})=>{

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>population {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(l=><li key={l[0]}>{l[1]}</li>)}
            </ul>

            <img src={country.flags.png} alt="flag" />
        </div>
    )
}

export default CountryDetail