import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewUserForm from './components/NewUserForm'
import ContactList from './components/ContactList'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchTerm, setSearchTerm] = useState('')
  const [ message, setMessage ] = useState(null)
  const [type,setType] = useState('error')

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
        setType('error')
        setMessage(`${newName} already exists!`)
        setTimeout(()=>setMessage(null),5000)
        setNewName('')
        setNewNumber('')
      } else {
        if(window.confirm(`${newName} already exists! Do you want to update the number?`)) {
          const newPerson = {name: newName, number: newNumber}
          personService
            .updatePerson(existingPerson.id,newPerson)
            .then(updatedPerson=>{
              setPersons(persons.map(p=>p.id===existingPerson.id ? updatedPerson : p))
              setType('completion')
              setMessage(`${newName} updated with new number`)
              setTimeout(() => {
                setMessage(null)
              }, 5000);
              setNewName('')
              setNewNumber('')
            })
            .catch(error=>{
              setType('error')
              setMessage(`Information of ${newName} has already been deleted`)
              setTimeout(() => {
                setMessage(null)
              }, 5000);
              setNewName('')
              setNewNumber('')
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
        .then(personAdded=>{
          setPersons(persons.concat(personAdded))
          setType('completion')
          setMessage(`Added new person, ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000);
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const handleDeleteOf = (index) => {
    if(window.confirm(`Are you sure you want to delete ${persons[index].name}`)){
      personService
        .deletePerson(persons[index].id)
        .then(r=>{
          console.log(r)
          setPersons(persons.filter(p=>p.id !== persons[index].id))
          setType('completion')
          setMessage(`${persons[index].name} deleted with success`)
          setTimeout(()=>setMessage(null),5000)
        })
    }
  }

  const personsToShow = searchTerm!=='' ?
    persons.filter(p=>p.name.toLowerCase().includes(searchTerm.toLowerCase())) :
    persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
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