import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://212.42.101.4:8769/api',
    timeout: 1000
});

instance.interceptors.request.use(
    (response) => {
        let token = localStorage.getItem('token')

        if (token) {
            response.headers['Authorization'] = `Bearer ${token}`
        }

        return response
    },

    (error) => {
      return error
    }
)

instance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role')
            window.location = "/login"
        } else {
            console.log(error)
        }
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
    insertReport(typedoc, xmldoc, sender, reciver, status) {
        return instance.post('/reports', { typedoc, xmldoc, sender, reciver, status })
    }

    getReportsFromAdmin() {
        return instance.get('/admin', { headers: { 'Content-Type': 'Application/json' } })
    }

    confirmReport(id, interrefer) {
        return instance.put('/reports', { id, interrefer })
    }

    updateReport(id, doc) {
        return instance.put('/reports/' + id, {id, doc})
    }
}

export default new ReportService();
