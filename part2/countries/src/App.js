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

  let countriesToShow = countries.filter(n=>n.name.common.toLowerCase().includes(search.toLowerCase()))

  if(selected!==null) countriesToShow=[countriesToShow[selected]]

  return (
    <div>
      find countries: <input onChange={handleChange} value={search} />
      <CountryList countries={countriesToShow} handler={handleSelected} />
    </div>
  )
}

export default App;
