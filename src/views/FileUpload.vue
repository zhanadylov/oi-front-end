<template>
  <div>
    <div class="container">
        <form @submit.prevent="handleSubmit">
            <p v-for="(item, index) in inputs" :key='index'>
              <input type="inputs" v-model="inputs[index]">
            </p>
            {{inputs}}
            <div class="form-group">
                <input type="file" @change="uploadFile" multiple>
            </div>
       <div v-for="file in files" :key="file.id" class="large-4 medium-4 small-6 cell file-listing">
          {{ file.name }}
          
        </div>
            <div class="form-group">
                <button class="btn btn-success btn-block btn-lg">Отправить</button>
            </div>
        </form>
    </div>    
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
        inputs: {
          input1: '',
          input2: '',
          input3: ''
        },
        files: null
      };
    },
    methods: {
        uploadFile (event) {
        this.files = event.target.files
        },
        handleSubmit() {
          
          const formData = new FormData();
          for (const i of Object.keys(this.files)) {
            formData.append('files', this.files[i])
          }
          formData.append('inputs', JSON.stringify(this.inputs)) // Данные с инпутов
          axios.post('http://localhost:8081/upload', formData, {
          }).then((res) => {
            console.log(res)
          })
        }  
    }

}
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
