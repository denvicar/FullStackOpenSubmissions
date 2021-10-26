import CountryDetail from "./CountryDetail";

const CountryList = ({countries,handler}) => {

    const getElementToShow = () => {
        if(countries.length===1)
            return <CountryDetail country={countries[0]} />
        else if (countries.length>10)
            return <p>Too many matches, specify another filter</p>
        else
            return countries.map((c,i)=>{
                return (
                    <p key={c.name.common}>{c.name.common}<button onClick={()=>handler(i)}>show</button></p> 
                )})
    }

    return (
        <div>
            {getElementToShow()}
        </div>
    )
}

export default CountryList