<template>
<div>
  <button @click="onClick()">Скачать файл</button>
<br>
<br>
  <button>Открыть файл</button>
</div>
</template>
<script>
import axios from 'axios';
import Queries from '../services/report.service'; // axios запросы на бэк энд
export default {
    created() {
        this.setinfo()
    },
  data() {
    return { filename: 'files-1603773571772.doc' };
  },
  methods: {
    onClick() {
      // axios({
      //   url: 'https://m.kse.kg/api/uploads/' + this.filename ,
      //   method: 'GET',
      //   responseType: 'blob',
      // })
       let token = localStorage.getItem('token')
       console.log(token)
        

      axios.get('https://m.kse.kg/api/uploads/?fileName=' + this.filename,{headers:{ "Authorization": `Bearer ${token}` , "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",

  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"}})
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');
        console.log(response);
        fileLink.href = fileURL;
        fileLink.setAttribute('download', this.filename);

        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    setinfo() {
      return Queries.getReportById(358)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          console.log(response)
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    showFile(){
      
    }
  },
};
</script>