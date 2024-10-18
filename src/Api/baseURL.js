import axios from 'axios';

//const baseURL = axios.create({ baseURL: 'http://127.0.0.1:8000' });
const baseURL = axios.create({
  baseURL: 'https://nodejs-ecommerce-api-v1.up.railway.app',
});

export default baseURL;
