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
        return instance.get('/reports', { headers: { 'Content-Type': 'Application/json' } })
    }
    getCompanyReports() {   // Получение всех отчетов компании по токену
        return instance.get('/reports/allreports', { headers: { 'Content-Type': 'Application/json' } })
    }
    getReportById(id) {     // Получение отчета по переданному id отчта
        return instance.get('/reports/' + id, { headers: { 'Content-Type': 'Application/json' } })
    }
    insertReport(typedoc, xmldoc, sender, reciver, status) {    // Добавить отчет
        return instance.post('/reports', { typedoc, xmldoc, sender, reciver, status })
    }

    getReportsFromAdmin() {     // Список отчетов со статусом отправлен, для админа
        return instance.get('/admin', { headers: { 'Content-Type': 'Application/json' } })
    }

    confirmReport(id, interrefer) {     // Квитовка отчета, для админа
        return instance.put('/reports', { id, interrefer })
    }

    updateReport(id, doc) {     // Изменить отчет
        return instance.put('/reports/' + id, {id, doc})
    }

    sendReport (id) {   // Изменить статус отчета на отправлен
        return instance.put('/reports/status/' + id)
    }
}

export default new ReportService();


/*

select * from tbldocuments, users, tblcompany 
where users.idcompany=tblcompany.id and 
(tbldocuments.sender= tblcompany.kod or tbldocuments.reciver= tblcompany.kod ) and
 users.login='admin'

*/