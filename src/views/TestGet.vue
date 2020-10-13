<template>
  <button @click="onClick()">Скачать файл</button>
</template>
<script>
import axios from 'axios';
import Queries from '../services/report.service'; // axios запросы на бэк энд
export default {
    created() {
        this.setinfo()
    },
  data() {
    return { filename: 'files-1602568797759.doc' };
  },
  methods: {
    onClick() {
      axios({
        url: 'http://localhost:8081/file?filename=' + this.filename,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
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
  },
};
</script>