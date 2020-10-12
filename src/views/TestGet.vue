<template>
  
  <button @click="onClick() ">Скачать файл</button>

</template>
<script>
import axios from 'axios';
export default {
    data(){
        return { filename: 'files-1602232253008.doc'}
    },
            methods: {
                onClick() {
                axios({
                        url: 'http://localhost:8081/file?filename='+this.filename,
                        method: 'GET',
                        responseType: 'blob',
                    }).then((response) => {
                        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        var fileLink = document.createElement('a');
                        console.log(response)
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', this.filename)
                  
                        document.body.appendChild(fileLink);
    
                        fileLink.click();
                    });
            }
      }
}

</script>