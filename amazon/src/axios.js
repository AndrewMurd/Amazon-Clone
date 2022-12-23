import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://us-central1-clone-d077e.cloudfunctions.net/api',
    
    // 'http://127.0.0.1:5001/clone-d077e/us-central1/api',
})

export default instance;