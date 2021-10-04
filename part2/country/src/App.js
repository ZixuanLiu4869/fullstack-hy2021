import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import Countries from "./components/Countries";


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setNewFilter] = useState('')


  const filterCountries = countries.filter((country) => country.name.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(response =>{
      setCountries(response.data)
    })
  }, [])




  return (
    <div>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <Countries filteredCountries={filterCountries} />
    </div>
  )
}

export default App;
