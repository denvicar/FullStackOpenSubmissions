import CountryDetail from "./CountryDetail";

const CountryList = ({countries,handler,searchTerm,selected}) => {
    countries = countries.filter(n=>n.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

    if (selected!==null) countries = [countries[selected]]

    const getElementToShow = () => {
        if(countries.length===1 && countries!==[]) 
            return <CountryDetail country={countries[0]} />
        else if (countries.length>10)
            return <p>Too many matches, specify another filter</p>
        else if (countries!==[])
            return countries.map((c,i)=>{
                return (
                    <p key={c.name.common}>{c.name.common}<button onClick={()=>handler(i)}>show</button></p> 
                )})
        else return <p></p>
    }

    return (
        <div>
            {getElementToShow()}
        </div>
    )
}

export default CountryList