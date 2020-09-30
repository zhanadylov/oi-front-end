<template>
  <div class="ReportLayout">
    <h3>
      Выберите
      <b-badge>существенный факт</b-badge>
    </h3>
    <b-form-group v-if="show">
      <b-radio-group
        class="radio-fact"
        id="btn-radios-3"
        v-model="selected"
        :options="options"
        buttons
        stacked
        @blur="sendData"
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
      ></b-radio-group>
    </b-form-group>
    <template v-else>
      <b-button @click="back" variant="outline-primary">Назад</b-button>
      <br />
      <br />
      <div class="table-div" id="table-content">
        <b-table-simple hover bordered small stacked>
          <thead>
            <tr>
              <th
                v-for="(item, index) in content.head"
                :key="index"
                :rowspan="item.rowspan"
                :colspan="item.colspan"
              >
                {{ item.text }}
              </th>
            </tr>
            <tr>
              <th v-for="(item, index) in content.head1" :key="index">
                {{ item }}
              </th>
              <th v-for="(item, index) in content.head2" :key="index">
                {{ item }}
              </th>
              <th v-for="(item, index) in content.head3" :key="index">
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th v-for="(item, index) in content.body.names" :key="index"></th>
            </tr>
            <tr>
              <td v-for="n in content.body.count" :key="n">
                <input
                  type="text"
                  class="input"
                  name="inputs"
                  :id="'input' + n"
                  @blur="sendData"
                />
              </td>
            </tr>
          </tbody>
        </b-table-simple>
        <!-- {{arr}} -->
      </div>
      <div></div>
    </template>
    {{ result }}
  </div>
</template>

<script>
import Queries from '../services/report.service'; // axios запросы на бэк энд
import forms from '../mixins/forms.js';
export default {
  name: 'FromKSE',
  mixins: [forms],
  created() {
    this.setinfo();
  },
  data() {
    return {
      content: {},
      selected: '',
      text: '',
      result: {},
      options: [
        {
          text:
            '1. Изменения в списке лиц, входящих в органы управления эмитента',
          value: 'form1',
        },
        {
          text: '2. Органы управления эмитента',
          value: 'form2',
        },
        {
          text:
            '3. Перечень ценных бумаг, исключенных из листинга фондовой биржи',
          value: 'form3',
        },
        {
          text: '4. Реестр участников торгов и уполномоченных трейдеров',
          value: 'form4',
        },
        {
          text:
            '5. Сведения о 5 участниках торгов, имеющих наибольшую сумму совершенных сделок в сомах с ценными бумагами',
          value: 'form5',
        },
        {
          text: '6. Отчет о сделках',
          value: 'form6',
        },
        {
          text: '7. Отчет о сделках по брокерским и дилерским фирмам',
          value: 'form7',
        },
        {
          text:
            '8. Список ценных бумаг, допущенных к обращению через торговую систему фондовой биржи',
          value: 'form8',
        },
        {
          text: '9. Информация о торгах',
          value: 'form9',
        },
        {
          text: '10. Значение индекса за торговый день',
          value: 'form10',
        },
      ],
      arr: [],
    };
  },
  computed: {
    show() {
      if (this.selected == '') return true;
      return this.viewFactBody();
    },
  },
  methods: {
    viewFactBody() {
      this.content = this.forms[this.selected];
      let h = document.getElementById('table-content');
      this.arr = [];
      this.$router.push({ path: 'report', query: { type: 'kse', btn: '1' } });
    },
    back() {
      this.selected = '';
      this.$router.push({ path: 'report', query: { type: 'kse', btn: '0' } });
    },
    sendData() {
      let inputs = document.getElementsByName('inputs');
      this.arr = [];
      for (let i = 0; i < inputs.length; i++) {
        this.arr.push(inputs[i].value);
      }
      this.$emit('input', {
        typedoc: this.selected,
        reportbody: this.arr,
        kvartal: ';',
        reportHead: { kod: this.$store.state.company.info.kod },
      });
    },
    setinfo() {
      if (this.$route.params.idreport) {
        return Queries.getReportById(this.$route.params.idreport)
          .then((response) => {
            //let xmldoc = JSON.parse(response.data.xmldoc)
            this.result = response.data;
            this.selected = response.data.typedoc;
            this.$nextTick(function () {
              let inputs = document.getElementsByName('inputs');
              for (let i = 1; i <= response.data.doc.reportbody.length; i++) {
                //console.log(response.data.doc.reportbody[i])
                let inp = document.getElementById('input' + i)//.value = '12'; // = response.data.doc.reportbody[i]
                inp.value = response.data.doc.reportbody[i - 1]

                console.log(inp);
                console.log(i);
              
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
.radio-fact label {
  line-height: 2;
  font-size: 17px;
  color: #506780;
  border-color: #506780;
  text-align: left;
  margin: 10px 0 !important;
}
.table-div {
  overflow: auto;
  position: absolute;
  width: 100%;
}
.ReportLayout {
  position: relative;
}
.btn-save {
  margin-top: 200px;
}
</style>