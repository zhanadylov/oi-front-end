<template>
  <div>
    <ul id="v-for-object" class="demo">
      <li v-for="(value, name) in content" :key="name++">
        <template v-if="facts[result.typedoc]['title' + name].type">
          <label>{{facts[result.typedoc]['title' + name].text}}</label>
          <b-datepicker :value="value" ></b-datepicker>
        </template>
        <template v-else>
          <label>{{facts[result.typedoc]['title' + name]}}</label>
          <b-input type="text" :value="value" name="inputs"></b-input>  
        </template>
      </li>
    </ul>
    {{result}}<br>    {{content}}
  </div>
</template>

<script>
import Queries from '../services/report.service'; // axios запросы на бэк энд
import facts from '../mixins/facts.js';

export default {
  name: 'FactComponent',
  created() {
    this.setinfo();
  },
  mixins: [facts],
  data() {
    return {
      content: '',
      result: []
    };
  },
  methods: {
    setinfo() {
      return Queries.getReportById(this.$route.params.id)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          this.result = response.data;
          this.content = response.data.doc;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>