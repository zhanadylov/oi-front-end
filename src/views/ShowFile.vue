<template>
    <div>
      <form>
        {{message}}
         <button @click="setinfo()">Открыть файл</button>
         <br>
         <br>
         <p v-for="(item, index) in inputs" :key="index">
          <input type="inputs" v-model="inputs[index]" />
        </p>
        <p v-for="(value, name, index) in files" :key="index" class="mt-2">
            {{ (name+1) + ' ' + value.name}}
            <button @click="deleteReport(name)">Remove file</button>
          </p>
          <div class="form-group">
          <button class="btn btn-success btn-block btn-lg" @click="handleSubmit()" >Отправить</button>
        </div>
        </form>
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
      message: {},
      inputs: {
        input1: '',
        input2: '',
        input3: '',
      },
    };
  },
  methods: {
     handleSubmit() {
      const formData = new FormData();
      let objects = {
        inputs: this.inputs,

      }
      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i]);
      }
      //formData.append('inputs', JSON.stringify(this.inputs)); // Данные с инпутов
      axios.post('http://localhost:8081/upload', formData, {}).then((res) => {
        
          this.progress = res.data.message;
          console.log(res.data.files)
          this.file_names=res.data.files
          //this.falinames = FileList.join()
          let typedoc = 'test';
          let xmldoc = JSON.stringify(this.file_names);
          let sender = 'test_test';
          let status = 1; // Статус 1 - можно отправить на сервер
          let kvartal = ';'
          console.log(xmldoc)
          // this.$store
          //   .dispatch('report/insert', { typedoc, xmldoc, sender, status, kvartal })
          //   .then(response => {
          //     this.$router.push('/reporting');
          //   })
          //   .catch(function(error) {
          //     console.log(error);
          //   });
     
      })
      
    },
    setinfo() {
      return Queries.getReportById(352)
        .then((response) => {
          console.log(response)
          this.inputs.input1 = response.data.doc.input1
          this.inputs.input2 = response.data.doc.input2
          this.inputs.input3 = response.data.doc.input3
          this.files = response.data.doc.files
        })
        .catch(function (error) {
          console.log(error);
        });
    },
   
  },
};
</script>