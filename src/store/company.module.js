import CompanyService from '../services/company.service'; // axios запросы на бэк энд


export const company = {
  namespaced: true,
  state: {
    info: [],
    reject: false,
    updateStatus: false,
    idCompany: null
  },
  actions: {

    getInfo({commit}) {
      return CompanyService.getInfoCompanyById().then(
        (dates) => {
          commit('infolist', dates.data)
          return Promise.resolve(true);
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    updateInfo({commit}, {name, opforma, activity, address, phone, fax, email, supervisor, id}) {
      return CompanyService.updateCompanyInfo(name, opforma, activity, address, phone, fax, email, supervisor, id).then(
        () => {
          commit('update')
          return Promise.resolve(true)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    rejectReport({commit}, id) {
      return ReportService.rejectReport(id).then(
        () => {
          commit('rejectReport')
          return Promise.resolve(true)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    addCompany({commit}, {name, kod}) {
      return CompanyService.addCompany(name, kod).then(
        (idCompany) => {
          commit('idCompany', idCompany.data)
          return idCompany.data;
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    addUser({commit}, {login, idcompany}) {
      return CompanyService.addUser(login, idcompany).then(
        () => {
          return Promise.resolve(true)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    infolist (state, dates) {
      state.info = dates
    },
    rejectReport (state) {
      state.reject = true
    },
    update(state) {
      state.updateStatus = true
    },
    idCompany(state, idCompany) {
      state.idCompany = idCompany
    }
  }
};
