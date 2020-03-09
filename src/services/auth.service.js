import axios from 'axios';

const API_URL = 'http://212.42.101.4:8769/api/users/';

class AuthService {
  async login(user) {
    const response = await axios
      .post(API_URL + 'register', {
        login: user.username,
        password: user.password
      })
    if (response.data.jwt) {
      await localStorage.setItem('token', response.data.jwt);
      await localStorage.setItem('role', response.data.role)
    }
    return response.data.jwt;
    ;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getCompanyReports() {
    return axios.get('http://212.42.101.4:8769/api/reports/allreports', { headers: { Authorization: 'Bearer ' + localStorage.getItem('token'), 'Content-Type': 'Application/json' } })
  }
}

export default new AuthService();
