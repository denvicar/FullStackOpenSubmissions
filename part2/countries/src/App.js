import axios from 'axios'
import React, {useState, useEffect} from 'react';
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response=> {
        console.log("retrieved data")
        setCountries(response.data)
      })
  },[])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const countriesToShow = countries.filter(n=>n.name.common.toLowerCase().includes(search.toLowerCase()))



  return (
    <div>
      find countries: <input onChange={handleChange} value={search} />
      <CountryList countries={countriesToShow} />
    </div>
  )
}

export default App;
