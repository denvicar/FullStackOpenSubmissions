import axios from 'axios'
import React, {useState, useEffect} from 'react';
import CountryList from './components/CountryList'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected,setSelected] = useState()

  useEffect(()=>{
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response=> {
        console.log("retrieved data")
        setCountries(response.data)
      })
  },[])

  const handleChange = (event) => {
    setSelected(null)
    setSearch(event.target.value)
  }

  const handleSelected = (index) => {
    console.log("selezionato paese ",index)
    setSelected(index)
  }





  return (
    <div>
      find countries: <input onChange={handleChange} value={search} />
      <CountryList countries={countries} searchTerm={search} handler={handleSelected} selected={selected}/>
    </div>
  )
}

export default App;
