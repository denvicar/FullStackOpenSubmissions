import React from "react";
import CountryDetail from "./CountryDetail";

const CountryList = ({countries}) => {
    return (
        <div>
            {countries.length>10
                ? <p>Too many matches, specify another filter</p>
                : countries.length===1
                ? <CountryDetail country={countries[0]} />
                : countries.map(c=><p key={c.name.common}>{c.name.common}</p>)}
        </div>
    )
}

export default CountryList