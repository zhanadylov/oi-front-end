<template>
  <div>
    <div class="container">
      <form>
        <p v-for="(item, index) in inputs" :key="index">
          <input type="inputs" v-model="inputs[index]" />
        </p>
        <!-- {{ inputs }} -->
        <div class="form-group">
          <b-form-file
            v-model="files" 
            multiple
            ref="file-input"
            class="mb-2"
            id="clean"  
          ></b-form-file>
          <p v-for="(value, name, index) in files" :key="index" class="mt-2">
            {{ (name+1) + ' ' + value.name}}
            <button @click="removeFile(name)">Remove file</button>
          </p>
        </div>
        <div class="form-group">
           <p v-if="progress">{{progress}}</p>
          <button class="btn btn-success btn-block btn-lg" @click="handleSubmit()" >Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Queries from '../services/report.service'; // axios запросы на бэк энд
export default {
  created() {
    // this.setinfo()
  },
  data() {
    return {
      inputs: {
        input1: '',
        input2: '',
        input3: '',
      },
     
      file_names: [],
     
      files: null,
      progress: ''
  
    };
  },
  methods: { 
    // addFiles(event){
    //     this.files = event.target.files;
    //   }, 
    // inputClean(){
    //   // this.files = [];
    //   if ( this.files > 20 ) {
    //     return this.files.substring(0,25) + '...'
    //   } else {
    //     return this.files
    //   }
    // },
    uploadFile(event) {
      this.files = event.target.files; 
    },
    removeFile(id) {
      let newFileList = Array.from(this.files);
      newFileList.splice(id, 1);
      console.log(newFileList);
      this.files = newFileList
    },
    handleSubmit() {
      const formData = new FormData();
 
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

    filelisttoarray() {
      FileList.prototype.toArray = function () {
        return Array.from(this).map(function (file) {
          return file.toObject();
        });
      };
    },

    filelisttoobject() {
      File.prototype.toObject = function () {
        return Object({
          lastModified: parseInt(this.lastModified),
          lastModifiedDate: String(this.lastModifiedDate),
          name: String(this.name),
          size: parseInt(this.size),
          type: String(this.type),
        });
      };
    },
    // setinfo() {
    //   return Queries.getReportById(352)
    //     .then((response) => {
    //       console.log(response)
    //       this.inputs.input1 = response.data.doc.input1
    //       this.inputs.input2 = response.data.doc.input2
    //       this.inputs.input3 = response.data.doc.input3
    //       this.files = response.data.doc.files
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 600px;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  font-size: 0.9rem;
}
input,
div,
button {
  margin-top: 2rem;
}
</style>
