<template>
  <div class="factcomponent">
    <template v-if="!EditReport">
      <div class="not_edit"></div>
    </template>
      <b-alert variant="success" show>{{factNames[$route.query.type]}}</b-alert>
      <b-alert variant="success" show>{{facts[result.typedoc].crib}}</b-alert>
      <b-table-simple hover small stacked>
        <b-tbody>
          <b-tr v-for="(item, index) in content" :key="index++">
            <template v-if="facts[result.typedoc]['titles']['title' + index].type == 'date'">
              <b-td width="40%">{{facts[result.typedoc]['titles']['title' + index].text}}</b-td>
              <b-td>
                <b-datepicker :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" name="inputs" @change="sendData" :data-option="index" :value="item"></b-datepicker>
              </b-td>
            </template>
            <template v-else-if="facts[result.typedoc]['titles']['title' + index].type == 'header'">
              <b-td colspan="2"><h5>{{facts[result.typedoc]['titles']['title' + index].text}}</h5></b-td>
            </template> 
            <template v-else>
              <b-td width="40%">{{facts[result.typedoc]['titles']['title' + index]}}</b-td>
              <b-td>
                <p>
                <b-form-textarea id="textarea-rows" @blur="sendData" class="simpleCart_input" rows="2" name="inputs" :data-option="index" :value="item"></b-form-textarea>
                </p>
              </b-td>
            </template>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <Supervisor />
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
      template: '<h3>{{ input }}</h3>',
      arr: []
      
    };
  },
  components: {
    Supervisor: () => import('../components/Supervisor.vue')
  },
  methods: {
    test() {
      if (/*localStorage.getItem('role') == 'admin' || */this.status == 2 || this.status == 3) {
          let $input = document.querySelectorAll('.simpleCart_input');
          for (let i = 0; i < $input.length; i++) {
            let $p = document.createElement('p');
            //let $p = document.createElement('plaintext');
            $input[i].value = $input[i].value.replace(/\n/g, '<br>');
            $p.innerHTML = $input[i].value;
            $p.classList.add("text-center")

            $input[i].parentNode.replaceChild($p, $input[i]);
          }
      }
    },
    setinfo() {
      return Queries.getReportById(this.$route.params.idreport)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          this.result = response.data;
          this.content = response.data.doc;
          this.status = response.data.status;
          this.$nextTick(function () {
            this.test()
          })
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
    },

    // slushat() {
    //   this.$on('id', function())
    // }
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
.factcomponent {
  position: relative;
}
  .not_edit {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 20;
    top: 0;
  }
</style>