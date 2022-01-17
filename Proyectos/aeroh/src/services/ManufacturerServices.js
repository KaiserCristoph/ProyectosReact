import axios from 'axios';

const manufacturersApi = 'http://localhost:8080/api/manufacturers'

const getManufacturers = () => {
    return axios.get(manufacturersApi)
}

export {
    getManufacturers
}