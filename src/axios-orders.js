import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-f29f5.firebaseio.com/'
});

export default instance;