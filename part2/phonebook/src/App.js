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
    const existingPerson = persons.find(p=>p.name.toLowerCase()===newName.toLowerCase())
    if(!!existingPerson) {
      if(existingPerson.number===newNumber) {
        alert(`${newName} already exists!`)
        setNewName('')
        setNewNumber('')
      } else {
        if(window.confirm(`${newName} already exists! Do you want to update the number?`)) {
          const newPerson = {name: newName, number: newNumber}
          personService
            .updatePerson(existingPerson.id,newPerson)
            .then(updatedPerson=>{
              setPersons(persons.map(p=>p.id===existingPerson.id ? updatedPerson : p))
            })
        } else {
          setNewName('')
          setNewNumber('')
        }
      }
      
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
    if(window.confirm("Are you sure you want to delete this person?")){
      personService
        .deletePerson(id)
        .then(r=>{
          console.log(r)
          setPersons(persons.filter(p=>p.id !== id))
        })
    }
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