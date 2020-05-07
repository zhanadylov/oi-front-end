import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './auth.module'
import {report} from './report.module'
import {company} from './company.module'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    report,
    company
  }
});
