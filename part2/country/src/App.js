import React, {useState, useEffect} from 'react'
import axios from 'axios'
//import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([])
  //const [filter, setNewFilter] = useState('')

  const filter_test = 'China'

  const filterCountries = countries.filter((country) => country.name.common.toLowerCase().includes(filter_test.toLowerCase()))

  //const handleFilterChange = (event) => {
    //setNewFilter(event.target.value)
  //}

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response =>{
      console.log(response.data[0])
      setCountries(response.data)
    })
  }, [])




  return (
    //<div>
      //<Filter value={filter} handleFilterChange={handleFilterChange} />
    //</div>
    <div>
      <Countries filteredCountries={filterCountries} />
    </div>
  )
}

export default App;
