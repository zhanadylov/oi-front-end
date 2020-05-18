<template>
  <div class="facts">
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
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
      ></b-radio-group>
    </b-form-group>
    <template v-else>
      <button @click="test">Назад</button>
      <template v-if="content.view == 'table'">
        <b-table-simple hover small stacked>
          <b-tbody>
            <b-tr v-for="(item, index) in content.titles" :key="index">
              <template v-if="item.type">
                <b-td>{{item.text}}</b-td>
                <b-td>
                  <b-datepicker name="inputs" :data-option="index"></b-datepicker>
                </b-td>
              </template>
              <template v-else>
                <b-td>{{item}}</b-td>
                <b-td>
                  <b-input type="text" name="inputs" :data-option="index"></b-input>
                </b-td>
              </template>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </template>
      <template v-else>
        <ul id="v-for-object" class="demo">
          <li v-for="(value, name) in content" :key="name">
            <template v-if="value.type">
              <label>{{value.text}}</label>
              <b-datepicker name="inputs" :data-option="name"></b-datepicker>
            </template>
            <template v-else>
              <template v-if="name == 'crib'">
                <span style="-webkit-user-modify: read-write-plaintext-only;">{{value}}</span>
              </template>
              <template v-else>
                <label>{{value}}</label>
                <b-input type="text" name="inputs" :data-option="name"></b-input>
              </template>
              
            </template>
          </li>
        </ul>
      </template>
      <b-button @click="save">Сохранить</b-button>
      {{arr}}
    </template>
  </div>
</template>

<script>
import facts from '../mixins/facts.js';

export default {
  name: 'Facts',
  mixins: [facts],
  data() {
    return {
      content: {},
      selected: '',
      options: [
        {
          text: '1(a).	Изменение в составе Исполнительного органа',
          value: 'fact1'
        },
        {
          text: '1(б).	Изменение в составе Совета директоров',
          value: 'fact1_1'
        },
        {
          text:
            'Изменения в размере участия лиц, входящих в органы управления эмитента, в уставном капитале эмитента, а также его дочерних и зависимых обществ, и об участии этих лиц в капитале других юридических лиц, если они владеют более чем 20 ',
          value: 'fact2'
        },
        {
          text: 'Изменения в списке владельцев ценных бумаг эмитента',
          value: 'fact3'
        },
        {
          text:
            'Изменения в списке юридических лиц, в которых эмитент владеет 20 и более процентами уставного капитала.',
          value: 'fact4'
        },
        {
          text:
            'Появление в реестре эмитента лица, владеющего более чем 5 процентами его эмиссионных ценных бумаг любого отдельного вида',
          value: 'fact5'
        },
        {
          text:
            '6. Разовые сделки эмитента, размер которых, либо стоимость имущества по которым составляет 10 и более процентов от активов эмитента на дату сделки',
          value: 'fact6'
        },
        {
          text:
            '6.1 Факт заключения договора или иного документа и/или факт государственной регистрации такого договора, предметом которого является приобретение, получение или передача во временное пользование сроком свыше одного года, либо отчуждение недвижимого имущества, независимо от площади недвижимого имущества.',
          value: 'fact6_1'
        },
        {
          text:
            'Факт (факты), повлекший разовое увеличение или уменьшение стоимости активов эмитента более чем на 10 процентов',
          value: 'fact7'
        },
        {
          text:
            'Факт (факты), повлекший разовое увеличение чистой прибыли или чистых убытков эмитента более чем на 10 процентов',
          value: 'fact8'
        },
        {
          text: 'Реорганизация эмитента, его дочерних и зависимых обществ',
          value: 'fact9'
        },
        {
          text: '10(а). Начисленные доходы по ценным бумагам (дивиденды)',
          value: 'fact10'
        },
        {
          text: '10(б). Выплаченные доходы по ценным бумагам (дивиденды)',
          value: 'fact10_1'
        },
        { text: '10(в). Начисленные доходы по облигациям', value: 'fact10_2' },
        { text: '10(г). Выплаченные доходы по облигациям', value: 'fact10_3' },
        { text: 'Решения общих собраний', value: 'fact11' },
        { text: 'Погашение ценных бумаг эмитента', value: 'fact12' }
      ],
      arr: []
    };
  },
  computed: {
    show() {
      if (this.selected == '') return true;
      return this.ff();
    }
  },
  methods: {
    ff() {
      this.content = this.facts[this.selected];
      this.date = '';
      this.date1 = '';
    },
    test() {
      this.selected = '';
    },
    save() {
      let inputs = document.getElementsByName('inputs');

      this.arr = []

      for (let i = 0; i < inputs.length; i++) {
        this.arr.push(inputs[i].value)
      }

      let typedoc = this.selected;
      let xmldoc = JSON.stringify(this.arr);
      let sender = this.$store.state.company.info.kod;
      let status = 1;
      this.$store
        .dispatch('report/insert', { typedoc, xmldoc, sender, status })
        .then(response => {
          this.selected = '';
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
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
</style>

