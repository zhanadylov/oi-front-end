/*export default {
  authHeader() { // Передает токен в axios, если он есть
    let token = this.setHeader
    if (token) {
      return token ; // for Spring Boot back-end
    } else {
      return {};
    }
  },

  setHeader(token) { // Задает токен после авторизации
    return {headers: {Authorization: 'Bearer ' + token}}
  }
  
}*/

export default {
  jwt: '',
  setToken(token) {
    this.jwt = token
  }
}

