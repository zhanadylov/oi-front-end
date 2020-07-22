import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://m.kse.kg/api',
  timeout: 1000,
  headers: authHeader()
});