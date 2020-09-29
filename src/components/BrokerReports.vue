<template>
  <div class="BrokerReports">
    <h3>
      Выберите
      <b-badge>отчет</b-badge>
    </h3>
    <b-form-group v-if="show">
      <b-radio-group
        class="radio-fact"
        id="btn-radios-3"
        v-model="selected"
        :options="formNames"
        buttons
        stacked
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
      ></b-radio-group>
    </b-form-group>
    <template v-else>
      <b-button @click="back" variant="outline-primary">Назад</b-button>
      <br />
      <br />
      <!-- Если выбрана форма 6, 7, 12 -->
      <template
        v-if="
          selected == 'brok6' || selected == 'brok7' || selected == 'brok12'
        "
      >
        <b-table
          bordered
          hover
          :items="content.body"
          :fields="content.head"
          head-variant="light"
        >
          <template #cell(title2)="row">
            <input
              type="text"
              v-model="row.item.title2"
              @blur="sendData"
            />
          </template>
        </b-table>
      </template>
      <!-- Если выбрана форма 3 бд -->
      <template v-else-if="selected == 'brok3'">
        <b-table-simple bordered hover head-variant="light">
          <b-thead>
            <b-tr>
              <b-th v-for="(item, index) in content.head" :key="index">{{
                item.label
              }}</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <b-tr v-for="(item, index) in content.body" :key="index">
              <b-td v-for="(it, ix) in item" :key="ix">
                <template v-if="ix == 'title0' || ix == 'title1'">
                  {{ it }}
                </template>
                <template v-else>
                  <input type="text" class="input" @blur="sendData" v-model="content.body[index][ix]"/>
                </template>
              </b-td>
            </b-tr>
          </tbody>
        </b-table-simple>
      </template>

      <template v-else>
        <b-table-simple hover bordered small stacked>
          <thead v-if="content.head">
            <tr>
              <th
                v-for="(item, index) in content.head.first"
                :key="index"
                :rowspan="item.rowspan"
                :colspan="item.colspan"
              >
                {{ item.text }}
              </th>
            </tr>
            <tr>
              <th v-for="(item, index) in content.head.second" :key="index">
                {{ item.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <b-tr v-for="(item, index) in content.body" :key="index">
              <b-td v-for="(it, ix) in item" :key="ix">
                <template v-if="ix == 'title0'">
                  {{ it }}
                </template>
                <template v-else>
                  <input type="text" class="input" @blur="sendData" v-model="content.body[index][ix]"/>
                </template>
              </b-td>
            </b-tr>
          </tbody>
        </b-table-simple>
      </template>
    </template>
  </div>
</template>

<script>
import forms from '../mixins/brokercompany.js';
export default {
  name: 'BrokerReports',
  mixins: [forms],
  data() {
    return {
      content: {},
      selected: '',
      kod: {kod: this.$store.state.company.info.kod},
      formNames: [
        { value: 'brok3', text: 'Форма 3 БД-1' },
        { value: 'brok4', text: 'Структура финансовых вложений' }, //Форма 4 БД-2
        { value: 'brok5', text: 'Сведения о сделках с ценными бумагами' }, // Форма 5 БД-3
        {
          value: 'brok6',
          text: 'Сведения об осуществлении брокерской деятельности',
        }, // Форма 6 Б-1
        {
          value: 'brok7',
          text:
            'Сведения об осуществлении деятельности по доверительному управлению инвестиционными активами',
        }, // Форма 7 ДУ-1
        {
          value: 'brok12',
          text: 'Показатели, характеризующие финансовое состояние организации',
        }, //Форма 12 ПД-4
        {
          value: 'brok13',
          text:
            'Информация о совершении операции с 5% и более с одним видом ценных бумаг одного эмитента',
        }, //Форма 13 ПД-5
      ],
      arr: [],
    };
  },
  computed: {
    show() {
      if (this.selected == '') return true;
      return this.viewFactBodys();
    },
  },
  methods: {
    viewFactBody() {
      
      this.content = this.brokercompany[this.selected];
      this.$router.push({path: 'report', query:{type:'broker',btn:'1'}})
    },
    back() {
      this.selected = '';
      this.$router.push({path: 'report', query:{type:'broker',btn:'0'}})
    },
    sendData() {
      this.$emit('input', {
        typedoc: this.selected, // выбранный документ в select
        reportbody: this.content, // Сформированный документ из mixin
        kvartal: ';', // Через сервер выставиться автоматически текущий квартал при таком значении
        reportHead: {kod: this.$store.state.company.info.kod}
      });
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
.forms-div {
  overflow: auto;
  position: absolute;
  width: 100%;
}
.BrokerReports {
  position: relative;
}
</style>