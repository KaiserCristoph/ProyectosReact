import axios from 'axios';

const modelsApi = 'http://localhost:8080/api/models'

const getModels = () => {
    return axios.get(modelsApi)
}

export {
    getModels
}