import React, {useState, useEffect} from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Number from "./components/Number";
import personService from "./services/Persons";
import Notification from "./components/Notification";


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const filterPerson = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name : newName,
      number: newNumber
    }
    const personExist = persons.find((person) => person.name === newName)
    if (personExist){
      const result = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        personService.updatePerson(personExist.id, personObj).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personExist.id ? person : returnedPerson))
        }).catch(error => {
          setErrorMessage(`the person ${personExist.name} was already deleted from server`)
          setTimeout(()=>{setErrorMessage(null)}, 5000)
          setPersons(persons.filter(n=> n.id !== personExist.id))
        })
        setErrorMessage(`Updated ${personObj.name}`)
        setTimeout(() => setErrorMessage(null), 5000)
      }
    }else{
      personService.create(personObj).then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${personObj.name}`)
        setTimeout(() => setErrorMessage(null), 5000)
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => setErrorMessage(null), 5000)
        console.log(error.response.data.error)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deletePerson = (id) => {
    personService.deletePerson(id).finally(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
  }

  const handleDeletePerson = (event) => {
    const pid = parseInt(event.target.id, 10)
    const person = persons.find(p => p.id === 1)
    const result = window.confirm(`Delete ${person.name}?`)
    if(result)
    {
      deletePerson(pid)
      setErrorMessage(`${person.name} is deleted`)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }


  return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h1>add a new</h1>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handlePhoneChange={handlePhoneChange} addPerson={addPerson} />
      <h1>Numbers</h1>
      <Number filterPerson={filterPerson} handleDeletePerson={(event)=>handleDeletePerson(event)}/>
    </div>
  )

}

export default App;
