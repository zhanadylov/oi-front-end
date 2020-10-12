<template>
  <div>
    <div class="container">
      <form @submit.prevent="handleSubmit">
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
            {{ (name+1) + ' ' + value.name }}
            <button @click="removeFile(name)">Remove file</button>
          </p>
          <!-- <input type="file" ref="file-input" v-model="files" @change="uploadFile" multiple> -->
        </div>
        <div class="form-group">
           <p v-if="progress">{{progress}}</p>
           <button v-on:click="addFiles()">Добавить файл</button>
          <button class="btn btn-success btn-block btn-lg" @click="inputClean()">Отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inputs: {
        input1: '',
        input2: '',
        input3: '',
      },
      files: null,
      progress: ''
  
    };
  },
  methods: { 
    addFiles(){
        this.files = event.target.files;
      }, 
    inputClean(){
      this.files = [];
    },

    uploadFile(event) {
      this.files = event.target.files;  
    },
    removeFile(id) {
      var newFileList = Array.from(this.files);
      newFileList.splice(id, 1);
      //console.log(newFileList);
      this.files = newFileList
    },
    handleSubmit() {
      const formData = new FormData();
      // let objects = {
      //   inputs: this.inputs,

      // }
      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i]);
        //objects.file.files[i].name
      }
      formData.append('inputs', JSON.stringify(this.inputs)); // Данные с инпутов
      axios.post('http://localhost:8081/upload', formData, {}).then((res) => {
        
       

        this.progress = res.data.message;
        console.log(res.data)
     
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
.file-upload {
  box-shadow: 2px 2px 9px 2px #ccc;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  width: 60%;
  margin: 0 auto;
}
input {
  font-size: 0.9rem;
}
input,
div,
button {
  margin-top: 2rem;
}
.progess-bar {
  height: 1rem;
  width: 0%;
  background-color: #151618;
  color: white;
  padding: 2px;
  font-weight: bold;
}
.upload-button {
  width: 7rem;
  padding: 0.5rem;
  background-color: #278be9;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 1rem;
}
.upload-button:disabled {
  background-color: #b3bcc4;
  /* cursor: no-drop; */
}
</style>
