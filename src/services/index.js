import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://212.42.101.4:8769/api',
  timeout: 1000,
  headers: authHeader()
});