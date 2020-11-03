<template>
 <div class="container">
   <b-table
      :fields="reportList"
      bordered
      hover
      class="reportList"
      head-variant="light"
    >
   </b-table>
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
      companyname: '', // Модальное окно квитанции
      result: [],
      reportList: [
        {
          key: 'id',
          headerTitle: '№',
          label: 'Наименование компании'
        },
        // {
        //   key: 'id',
        //   headerTitle: 'Название компании',
        //   label: 'Название компании'
        // },
        {
          key: 'status',
          headerTitle: 'Статус документа',
          label: 'Статус документа'
        },
        {
          key: 'createdate',
          headerTitle: 'Дата регистрации',
          label: 'Дата регистрации'
        },
        {
          key: 'typedoc',
          headerTitle: 'Тип документа',
          label: 'Тип документа'
        },
        { key: 'refer', headerTitle: 'Подтвердить', label: '' }
      ]
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