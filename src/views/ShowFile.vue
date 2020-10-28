<template>
 <div class="container">
    <div>
      <form>  
         <div v-if="inputs.length">
            <p v-for="(input, key) in inputs" :key="key">
              <b-form-input style="width:70%"  v-model="inputs[key]" ></b-form-input>
            </p>
        </div>
        <div v-else>
        </div>
        <div v-if="files.length">
          <table style="width:70%">
            <tr v-for="(file, key) in files" :key="key">
            <td>{{ file}} </td>
            <td class="button"> <b-button variant="danger" class="remove-file" v-on:click="removeFile( key )">Удалить</b-button></td>
            </tr>
          </table>
        </div>
        <div v-else>
        </div>
         <b-button variant="success" @click="update"
          >Обновить</b-button
        >
      </form>
    </div>
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
      inputs: [
      ],
      files:[]
    };
  },
  methods: {
    setinfo() {  // Вывод отправленных файлов из БД
      return Queries.getReportById(420)
        .then((response) => {
          console.log(response)
          if (response.data.doc.inputs)
          {
              this.inputs=response.data.doc.inputs
          }
          this.files=response.data.doc.files

        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeFile( key ){
        this.files.splice( key, 1 );
    },
    update() {
      let id = this.$route.params.idreport;
      let doc
      let sender = 'test_test';
      let status = 1;
      let kvartal = ';'
      let typedoc = 'test';
      let xmldoc = JSON.stringify(data);
      let data = { files: this.file_names, inputs: this.inputs };
      if (this.$route.query.type.sender('test') >= 0) {
        
      if (doc != 0) {
        this.$store
          .dispatch('report/insert', { typedoc,
            xmldoc,
            sender,
            status,
            kvartal, })
          .then(response => {
            this.$router.push('/reporting');
          })
          .catch(function(error) {
            console.log(error);
          });
        console.log(sender)
      }
      else {
        this.$router.push('/reporting')
      }
      }
    }
    },
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