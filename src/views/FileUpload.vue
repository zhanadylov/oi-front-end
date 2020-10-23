<template>
  <div class="container">
      <p v-for="(input, key) in inputs" :key="key">
        <b-form-input style="width:70%"  v-model="inputs[key]" ></b-form-input>
      </p>
      <label>
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </label>
    <table style="width:70%">
      <tr v-for="(file, key) in files" :key="key">
        <td>{{ file.name }} </td>
        <td class="button"> <b-button variant="danger" class="remove-file" v-on:click="removeFile( key )">Удалить</b-button></td>
      </tr>
    </table>
     <div class="box">
        <div class="box-2">
          <b-button variant="outline-primary" v-on:click="addFiles()">
            <b-icon class="icon-upload" icon="upload"></b-icon>Добавить файлы
          </b-button></div>
       <div class="box-2" style="color:green;font-size:20px;"><p  v-if="progress"> <strong>{{progress}}</strong> </p></div>
      <div class="box-2"> <b-button variant="success" v-on:click="submitFiles()">Отправить</b-button></div>
     </div>
  </div>
</template>
<script>
import axios from 'axios';
import Queries from '../services/report.service'; // axios запросы на бэк энд
  export default {
    data(){
      return {
        inputs: [ '',
         '',
        ''],
        files: [],
        progress: '',
        file_names:[]
      }
    },
    methods: {
      addFiles(){
        this.$refs.files.click();
        this.progress=null
      },
      submitFiles(){
        let formData = new FormData();
        for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i]);
        }
        axios.post( 'http://localhost:8081/upload',
          formData,
          {
            
          }).then((res)=>{
           this.progress = res.data.message;
           this.files = [];
           this.file_names=res.data.files
          let data = {files: this.file_names,inputs:this.inputs}
           console.log(this.file_names)
            let typedoc = 'test';
            let xmldoc = JSON.stringify(data);
            let sender = 'test_test';
            let status = 1; // Статус 1 - можно отправить на сервер
            let kvartal = ';'
            console.log(xmldoc)
            this.$store
              .dispatch('report/insert', { typedoc, xmldoc, sender, status, kvartal })
              .then(response => {
                this.$router.push('/reporting');
              })
              .catch(function(error) {
                console.log(error);
              });
        })
      },
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      removeFile( key ){
        this.files.splice( key, 1 );
      }
    }
  }
</script>

<style>
  input[type="file"]{
    position: absolute;
    top: -500px;
    margin-bottom: 30px;
  }
  table, th, td {
  border: 1px solid #eee;
  border-collapse: collapse;
  margin-top:-15px;
  margin-bottom:15px;
  }
  th, td {
    padding: 5px;
    text-align: left;
  }
  .button{
    text-align: center;
  }
  .box-2{
    padding-top:5px
  }
  .box{
     margin-top: 15px;
  }
  .icon-upload{
    margin-right: 10px;
  }
</style>