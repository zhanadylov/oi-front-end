<template>
  <div>
    <b-button @click="addForm"> Добавить файлы </b-button>

    <div v-for="(form, key) in formsData" :key="key">
      <b-form-select
        v-model="form.file_type"
        :options="options"
        style="width: 40%"
      >
      </b-form-select>

      <!-- <b-button v-model="form.file_name" variant="outline-primary" v-on:click="addFiles()" multiple>
        
<b-icon class="icon-upload" icon="upload">
</b-icon>Загрузить
      </b-button> -->

      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFilesUpload(key)"
      />

      <b-button variant="danger" @click="removeForm(key)">Удалить</b-button>
    </div>
    <b-button variant="danger" @click="showFormValue()">Вывести</b-button>
    <p>{{ select }}</p>
  </div>
</template>



<script>
import axios from 'axios';
import Queries from '../services/report.service'; // axios запросы на бэк энд
export default {
  data() {
    return {
      select: '',

      options: [
        { value: null, text: '--Выберите тип файла--' },

        { value: 1, text: 'Финансовая отчетность' },

        { value: 2, text: 'Аудиторское заключение' },

        { value: 3, text: 'Заключение Ревизионной комиссии' },

        { value: 4, text: 'Отчет Совета директоров' },

        { value: 5, text: 'Отчет Исполнительного органа' },

        { value: 6, text: 'Протокол Годового собрания акционеров' },

        { value: 7, text: 'Протокол счетной комиссии' },

        {
          value: 8,
          text: 'Краткое описание практики корпоративного управления',
        },
      ],
      formsData: [],

      defaultForm: {
        file_type: '',

        file_name: '',
      },
    };
  },

  methods: {
    addForm() {
      this.formsData.push(Object.assign({}, this.defaultForm));
    },

    removeForm(i) {
      this.formsData.splice(i, 1);
    },

    showFormValue() {
      this.select = this.formsData;
    },

    handleFilesUpload(key, file) {
      this.formsData[key].file_name = 'ghgh';
    },
  },
};
</script>


<style>
button {
  margin: 5px 0px 5px 5px;
}
</style>