import CompanyService from '../services/company.service'; // axios запросы на бэк энд


export const company = {
  namespaced: true,
  state: {
    info: [],
    reject: false,
    updateStatus: false
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

    updateInfo({commit}, {name, opforma, activity, address, phone, fax, email, id}) {
      return CompanyService.updateCompanyInfo(name, opforma, activity, address, phone, fax, email, id).then(
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
    }
  }
};
