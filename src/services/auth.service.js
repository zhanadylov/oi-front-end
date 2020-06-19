import axios from 'axios';

const API_URL = 'http://212.42.101.4:8769/api/users/';

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + 'auth', {
        login: user.username,
        password: user.password
      })
    if (response.data.jwt) {
      await localStorage.setItem('token', response.data.jwt);
      await localStorage.setItem('role', response.data.role)
      if (user.username == 'fin')
        localStorage.setItem('fin', true)
    }
    return response.data.jwt;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fin');
  }

  info() {
    return axios.get(API_URL + 'me', { headers: { 'Content-Type': 'Applicationjson', 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
  }

  update(login, fullname) {
    return axios.put(API_URL, {login, fullname}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
  }

}

export default new AuthService();
