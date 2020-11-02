<template>
 <div class="container">
   
 
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
    return {
  
    };
  },
  methods: {
    setinfo() {  // Вывод отправленных файлов из БД
      return Queries.selectDelReports()
        .then((response) => {
          console.log(response.data)
    
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
  };
</script>

<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  table, th, td {
  border: 1px solid #eee;
  border-collapse: collapse;
  margin-top:15px;
  margin-bottom:15px;
  }
  th, td {
    padding: 5px;
    text-align: left;
  }
  .button{
    text-align: center;
  }
  .box{
    padding:5px
  }
</style>