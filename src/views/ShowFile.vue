<template>
    <div>
      <form>
         <button @click="setinfo()">Открыть файл</button>
         <br>
         <br>
         <div v-if="inputs.length">
            <p v-for="(item, index) in inputs" :key="index">
            <input type="inputs" v-model="inputs[index]" />
            </p>
        </div>
        <div v-else>
        </div>
<!-- 
        <div v-if="files.length">
           <p  v-for="(item)in files" :key="item">
            {{item}}
            <button @click="removeFile(name)">Remove file</button>
          </p>
        </div>
        <div v-else>
        </div>
       -->
           
          <!-- <button @click="deleteReport(index)">Remove file</button> -->
     
          <!-- <div class="form-group">
          <button class="btn btn-success btn-block btn-lg" @click="handleSubmit()" >Отправить</button>
        </div> -->
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
      inputs: [
      ]
      ,
      files:[]
    };
  },
  methods: {
    
     removeFile(id) {
      let newFileList = Array.from(this.files);
      newFileList.splice(id, 1);
      console.log(newFileList);
      this.files = newFileList
    }
,


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
      return Queries.getReportById(372)
        .then((response) => {
          console.log(response)
          if (response.data.doc.input1)
          {
              this.inputs.push(response.data.doc.input1) 
          }
          if (response.data.doc.input2)
          {
              this.inputs.push(response.data.doc.input2) 
          }
          if (response.data.doc.input3)
          {
              this.inputs.push(response.data.doc.input3) 
          }
       
          //his.files.push(response.data.doc.files)
          
          // this.files.forEach(element => {
          //   console.log(element)
          // });
          console.log(response.data.doc.files)
          
        })
        .catch(function (error) {
          console.log(error);
        });
    },
   
  },
};
</script>