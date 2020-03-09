import ReportService from '../services/report.service'; // axios запросы на бэк энд


export const report = {
  namespaced: true,
  state: {
    list: [],
    confirm: false,
    insert: false
  },
  actions: {
    insert({ commit }, {typedoc, xmldoc, sender, reciver}) {
      return ReportService.insertReport(typedoc, xmldoc, sender, reciver).then(
        () => {
          commit('insertSuccess');
          return Promise.resolve(true);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    getList({commit}) {
      console.log('from store')
      return ReportService.getCompanyReports().then(
        (dates) => {
          commit('listStatus', dates.data)
          return true
        },
        error => {
          return Promise.reject(error)
        }
      )
    },

    confirm({commit}, {id, interrefer}) {
      return ReportService.confirmReport(id, interrefer).then(
        () => {
          commit('confirmReport')
          return Promise.resolve(true)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    listStatus (state, dates) {
      state.list = dates
    },
    confirmReport (state) {
      state.confirm = true
    },
    insertSuccess (state) {
      state.inser = true
    }
  }
};
