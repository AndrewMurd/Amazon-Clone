import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-d077e.cloudfunctions.net/api',
})

export default instance;