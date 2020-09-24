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
      <b-table-simple hover bordered small stacked>
          <thead>
            <tr>
              <th
                v-for="(item, index) in content.head.first"
                :key="index"
                :rowspan="item.rowspan"
                :colspan="item.colspan"
              >{{item.text}}</th>
            </tr>
            <tr>
              <th v-for="(item, index) in content.head.second" :key="index">{{item.text}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in content.body.names" :key="index">
              <td>
                <p>{{item}}</p>
              </td>
              <td v-for="n in content.body.count" :key="n">
                <input type="text" class="input"/>
              </td>
            </tr>
          </tbody>
        </b-table-simple>
      
      </template>
  </div>
</template>

<script>
import brokercompany from '../mixins/brokercompany.js';
export default {
  name: 'BrokerReports',
  mixins: [brokercompany],
  data() {
    return {
      content: {},
      selected: '',
      formNames: [
        { value: 'form3', text: 'Форма 3 БД-1' },
        { value: 'form4', text: 'Структура финансовых вложений' }, //Форма 4 БД-2
        { value: 'form5', text: 'Сведения о сделках с ценными бумагами' }, // Форма 5 БД-3
        {
          value: 'form6',
          text: 'Сведения об осуществлении брокерской деятельности',
        }, // Форма 6 Б-1
        {
          value: 'form7',
          text:
            'Сведения об осуществлении деятельности по доверительному управлению инвестиционными активами',
        }, // Форма 7 ДУ-1
        {
          value: 'form12',
          text: 'Показатели, характеризующие финансовое состояние организации',
        }, //Форма 12 ПД-4
        {
          value: 'form13',
          text:
            'Информация о совершении операции с 5% и более с одним видом ценных бумаг одного эмитента',
        }, //Форма 13 ПД-5
      ],
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
      this.content = this.brokercompany[this.selected];
    },
    back() {
      this.selected = '';
    },
  },
};
</script>