<template>
  <div>
    <template v-if="!EditReport">
      <div class="not_edit"></div>
    </template>
    <template v-if="facts[result.typedoc].view == 'table'">
      <b-table-simple hover small stacked>
        <b-tbody>
          <b-tr v-for="(item, index) in content" :key="index++">
            <template v-if="facts[result.typedoc]['titles']['title' + index].type">
              <b-td>{{facts[result.typedoc]['titles']['title' + index].text}}</b-td>
              <b-td>
                <b-datepicker name="inputs" @change="sendData" :data-option="index" :value="item"></b-datepicker>
              </b-td>
            </template>
            <template v-else>
              <b-td>{{facts[result.typedoc]['titles']['title' + index]}}</b-td>
              <b-td>
                <b-input type="text" @blur="sendData" name="inputs" :data-option="index" :value="item"></b-input>
              </b-td>
            </template>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </template>
    <template v-else>
      <ul id="v-for-object" class="demo">
        <li v-for="(value, name) in content" :key="name++">
          <template v-if="facts[result.typedoc]['title' + name].type">
            <label>{{facts[result.typedoc]['title' + name].text}}</label>
            <b-datepicker name="inputs" @blur="sendData" :value="value"></b-datepicker>
          </template>
          <template v-else>
            <label>{{facts[result.typedoc]['title' + name]}}</label>
            <b-input type="text" @blur="sendData" :value="value" name="inputs"></b-input>
          </template>
        </li>
      </ul>
    </template>
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
      result: [],
      status: null,
      props: ['input'],
      arr: []
    };
  },
  methods: {
    setinfo() {
      return Queries.getReportById(this.$route.params.id)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          this.result = response.data;
          this.content = response.data.doc;
          this.status = response.data.status;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendData() {
      let inputs = document.getElementsByName('inputs');

      this.arr = []

      for (let i = 0; i < inputs.length; i++) {
        this.arr.push(inputs[i].value)
      }
      this.$emit('input', JSON.stringify(this.arr));
    }
  },
  computed: {
    EditReport() {
      if (this.status == 1 || this.status == 4 || this.status == null) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style>
  .not_edit {
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 20;
    top: 0;
  }
</style>