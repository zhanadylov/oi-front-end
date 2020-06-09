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

    getInfoCompanyById() {  // Получение данных компании по токену, для заполнения шапки отчета
        return instance.get('/reports', { headers: { 'Content-Type': 'Applicationjson' } })
    }
    getCompanyReports(type) {   // Получение всех отчетов компании по токену
        return instance.get('/reports/allreports/' + type, { headers: { 'Content-Type': 'Applicationjson' } })
    }
    getReportById(id) {     // Получение отчета по переданному id отчта
        return instance.get('/reports/' + id, { headers: { 'Content-Type': 'Applicationjson' } })
    }
    insertReport(typedoc, xmldoc, sender, status, kvartal) {    // Добавить отчет
        return instance.post('/reports', { typedoc, xmldoc, sender, status, kvartal })
    }

    getReportsFromAdmin() {     // Список отчетов для админа
        return instance.get('/admin', { headers: { 'Content-Type': 'Applicationjson' } })
    }

    confirmReport(id, interrefer) {     // Квитовка отчета, для админа
        return instance.put('/reports', { id, interrefer })
    }

    updateReport(id, doc) {     // Изменить отчет
        return instance.put('/reports/' + id, {id, doc})
    }

    sendReport (id, type) {   // Изменить статус отчета на отправлен
        return instance.put('/reports/status/' + id, {id, type})
    }

    backReport(id) {
        return instance.put('/reports/back/' + id)
    }

    rejectReport(id) {
        return instance.put('/reports/reject/' + id)
    }

    test(doAddEntry, BlogId, mEntryText, mEntryName, mEntryCompany, title) {
        return axios.post('http://www.kse.kg/modules/Blog/addFact.php', doAddEntry, BlogId, mEntryText, mEntryName, mEntryCompany, title)
    }

    addReportInKSE(doc) {
        return axios.post('http://www.kse.kg/modules/Blog/addReport.php', doc)
    }

    addLinkToFact(idfact, link) {
        return instance.put('/reports/link/' + link, {idfact, link})
    }
}

export default new ReportService();