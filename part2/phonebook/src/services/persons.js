import axios from 'axios'
const baseUrl="/api/persons"

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(res=>{
            console.log(res)
            return res.data
        })
}

const addPerson = (newPerson) => {
    return axios
        .post(baseUrl,newPerson)
        .then(res=>res.data)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(res=>res.data)
}

const updatePerson = (id,newObject) => {
    return axios
        .put(`${baseUrl}/${id}`,newObject)
        .then(res=>res.data)
}

const personService = {getAll, addPerson, deletePerson, updatePerson}
export default personService
