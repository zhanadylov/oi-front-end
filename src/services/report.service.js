import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://212.42.101.4:8769/api',
    timeout: 1000
});

instance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    },

    (error) => {
      return error
    }
)


class ReportService {

    getInfoCompanyById() {
        return instance.get('/reports', { headers: { 'Content-Type': 'Application/json' } })
    }
    getCompanyReports() {
        return instance.get('/reports/allreports', { headers: { 'Content-Type': 'Application/json' } })
    }
    getReportById(id) {
        return instance.get('/reports/' + id, { headers: { 'Content-Type': 'Application/json' } })
    }
    insertReport(typedoc, xmldoc, sender, reciver) {
        return instance.post('/reports', { typedoc, xmldoc, sender, reciver })
    }

    getReportsFromAdmin() {
        return instance.get('/admin', { headers: { 'Content-Type': 'Application/json' } })
    }

    confirmReport(id, interrefer) {
        return instance.put('/reports', { id, interrefer })
    }
}

export default new ReportService();
