import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewUserForm from './components/NewUserForm'
import ContactList from './components/ContactList'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    personService
      .getAll(initialPersons=>setPersons(initialPersons))
  },[])


  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.map(p=>p.name).includes(newName)) {
      alert(`${newName} already exists!`)
      setNewName('')
      setNewNumber('')
    } else {
      const newPerson = {name: newName, number: newNumber}
      personService
        .addPerson(newPerson)
        .then(personAdded=>setPersons(persons.concat(personAdded)))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleDeleteOf = (id) => {
    personService
      .deletePerson(id)
      .then(r=>{
        console.log(r)
        setPersons(persons.filter(p=>p.id !== id))
      })
  }

  const personsToShow = searchTerm!=='' ?
    persons.filter(p=>p.name.toLowerCase().includes(searchTerm.toLowerCase())) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={searchTerm} handler={handleSearch} />
      <h2>add a new</h2>
      <NewUserForm
        handleChange={handleChange}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <ContactList persons={personsToShow} onDelete={handleDeleteOf} />
    </div>
  )
}

export default App