import axios from 'axios'
const baseUrl="http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res=>res.data)
}

const addPerson = (newPerson) => {
    return axios
        .post(baseUrl,newPerson)
        .then(res=>res.data)
}

const personService = {getAll, addPerson}
export default personService