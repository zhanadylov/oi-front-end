import axios from 'axios';
import { post } from 'jquery';

const instance = axios.create({
   baseURL: 'https://m.kse.kg/api',
   // baseURL: 'http://localhost:8081/api',
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

    updateReport(id, doc, status, kvartal, typedoc) {     // Изменить отчет
        return instance.put('/reports/' + id, {id, doc, status, kvartal, typedoc})
    }

    sendReport (id, type) {   // Изменить статус отчета на отправлен
        return instance.put('/reports/status/' + id, {id, type})
        axios.post('https://api.telegram.org/bot1404700008:AAEuYHPRxpmjgVkPG5L4DqhgPaXcbaWMDOM/sendmessage?chat_id=1245930350&text=%D0%9D%D0%BE%D0%B2%D0%B0%D1%8F%20%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%8C%20%D0%B4%D0%BB%D1%8F%20%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0')
    }

    backReport(id) {
        return instance.put('/reports/back/' + id)
    }

    rejectReport(id) {
        return instance.put('/reports/reject/' + id)
    }

    test(doAddEntry, BlogId, mEntryText, mEntryName, mEntryCompany, title) {
        return axios.post('https://www.kse.kg/modules/Blog/addFact.php', doAddEntry, BlogId, mEntryText, mEntryName, mEntryCompany, title)
    }

    addReportInKSE(doc, kvartal) {
        return axios.post('https://www.kse.kg/modules/Blog/addReport.php', {doc, kvartal})
    }

    addLinkToFact(idfact, link) {
        return instance.put('/reports/link/' + link, {idfact, link})
    }

    deleteReport(id) {
        return instance.delete('/reports/' + id)
    }
    //del report 
    // delReports(id) {
    //     return instance.delete('/reports/' + id)
        
    // }
    deleting(id){
        return instance.delete('/reports/deletingForever/' + id)
    }
    recoverDoc(id){
        return instance.delete('/reports/recoverDoc/' + id)
    }

    deleteReportInKSE(id, type) {
        return axios.post('https://www.kse.kg/modules/Blog/delReport.php', {id, type})
    }
    selectDelReports(){ //Список удаленных отчетов
        return instance.get('/reports/allDelreports')
    }  
}

export default new ReportService();