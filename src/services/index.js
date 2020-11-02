import axios from 'axios';


const instance = axios.create({
   baseURL: 'https://m.kse.kg/api',
  //baseURL: 'http://localhost:8081/api',
  timeout: 1000,
  headers: authHeader()
});