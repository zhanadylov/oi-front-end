<template>
  
  <button @click="onClick()">DownLoad</button>

</template>
<script>
import axios from 'axios';

import FileSaver from 'file-saver';
export default {
      methods: {
          onClick() {
                axios
        .get(
            'http://localhost:8081/file'
        )
        .then(response => {
            FileSaver(response.data, fileName);
            console.log(response.headers); // does not include content-disposition
            console.log("File downloading successfully!");
        })
        .catch( (error) => {
            console.error("File could not be downloaded:", error);
        });
}
            }
        }

</script>