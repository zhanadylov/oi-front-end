<template>
  <div>
    <b-select v-model="selected" :options="options" @change="getReportList" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template v-slot:first>
        <b-select-option :value="null" disabled>-- Выберите тип документа --</b-select-option>
      </template>
    </b-select>
    <b-table
      :fields="reportList"
      bordered
      hover
      :items="items"
      class="report-list"
      head-variant="light"
    >
      <template #cell(id)="row" v-if="isadmin">{{row.item.name}}</template>

      <template #cell(createdate)="row">
        <p v-if="isadmin">{{row.item.datesend}}</p>
        <p v-else>
          <span>{{row.item.createdate}}</span>
          <br />
          <b-button
            size="sm"
            @click="row.toggleDetails"
            class="mr-2"
            v-if="row.item.datesend || row.item.updatedate"
          >{{ row.detailsShowing ? 'Скрыть' : 'Показать'}} Детали</b-button>
        </p>
      </template>

      <template #cell(status)="row">
        <span v-if="row.item.status == 1">Редактирование</span>
        <span v-else-if="row.item.status == 2">Отправлен</span>
        <span v-else-if="row.item.status == 3">Принят</span>
        <span v-else-if="row.item.status == 4">Отклонен</span>
      </template>
      <template #cell(typedoc)="row">
        <router-link :to="`/anex-1/${row.item.id}`" v-if="row.item.typedoc == 'anex-1'" class="nav-link">Приложение 1</router-link>
        <router-link :to="`/anex-2/${row.item.id}`" v-else-if="row.item.typedoc == 'anex-2'" class="nav-link">Приложение 2</router-link>
        <router-link v-else :to="`/report/${row.item.id}?type=${row.item.typedoc}`" class="nav-link">
          <span v-if="row.item.typedoc == 'RKV01'">Квартальный отчет</span>
          <span v-else-if="row.item.typedoc == 'RKV02'">Годовой отчет</span>
          <span v-else>Существенный факт</span>
        </router-link>
      </template>

      <template #cell(refer)="row">
        <p v-if="isadmin">
          <span v-if="row.item.typedoc !== 'KVIT01'">
            <b-button
              variant="success"
              v-if="row.item.refer == null"
              @click="confirm(row.item.id, row.item.sender, row.item.doc, row.item.name, row.item.typedoc)"
            >Подтвердить</b-button>
            <b-button variant="outline-primary" v-else>Подтвердено</b-button>
          </span>
        </p>
        <p v-else>
          <template v-if="row.item.typedoc[0] != 'a'">
            <b-button
              v-if="row.item.status == 1 || row.item.status == 4"
              @click="sendReport(row.item.id)"
              variant="primary"
            >Отправить</b-button> 
            <b-button
              v-if="row.item.status == 2"
              @click="backReport(row.item.id)"
              variant="warning"
            >Отменить отправку</b-button>
            <b-button
              @click="modal(row.item.typedoc, row.item.confirmdate, row.item.name, row.item.linkkse)"
              v-b-modal.modal-center
              v-else-if="row.item.status == 3"
              variant="success"
            >Квитанция</b-button>
          </template>
        </p>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right" v-if="row.item.updatedate">
              <b>Дата последнего изменения:</b>
            </b-col>
            <b-col>{{ row.item.updatedate }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right" v-if="row.item.datesend">
              <b>Дата отправки:</b>
            </b-col>
            <b-col>{{ row.item.datesend }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Скрыть</b-button>
        </b-card>
      </template>
    </b-table>
    <b-modal id="modal-center" size="lg" centered title="Квитанция">
      <p class="my-4">{{companyname}}</p>
      <p class="my-4">
        Основание документа:
        <span v-if="doctype == 'RKV01'">Квартальный отчет</span>
        <span v-else-if="doctype == 'RKV02'">Годовой отчет</span>
        <span v-else>Существенный факт</span>
      </p>
      <p class="my-4">Дата: {{date}}</p>
      <p class="my-4">
        Опубликовано на официальном сайте
        <template v-if="link == 0">
          <a href="www.kse.kg">ЗАО "Кыргызская Фондовая Биржа"</a>
        </template>
        <template v-else>
          <a
            :href="'http://www.kse.kg/ru/RussianAllNewsBlog/' + link"
            target="_blank"
          >ЗАО "Кыргызская Фондовая Биржа"</a>
        </template>
      </p>
      <b-button class="print" @click="print" onclick="window.print()">Печать</b-button>
    </b-modal>
  </div>
</template>
<script>

import { mapState } from 'vuex';
import Queries from '../services/report.service';
import facts from '../mixins/facts.js';
export default {
  name: 'ReportList',
  created() {
    this.getReportList();
  },
  mixins: [facts],
  data() {
    return {
      link: 0,
      date: '',
      doctype: '',
      selected: '',
      options: [
        { value: '', text: 'Все' },
        { value: 'RKV', text: 'Отчетность' },
        { value: 'fact', text: 'Существенные факты' }
      ],
      companyname: '',
      result: [],
      reportList: [
        {
          key: 'id'
        },
        {
          key: 'status',
          headerTitle: 'Статус документа',
          label: 'Статус документа'
        },
        {
          key: 'createdate',
          headerTitle: 'Дата регистрации',
          label: 'Дата регистрации'
        },
        {
          key: 'typedoc',
          headerTitle: 'Тип документа',
          label: 'Тип документа'
        },
        { key: 'refer', headerTitle: 'Подтвердить', label: 'Подтвердить' }
      ],
      factNames: {
        fact1: 'Изменение в составе Исполнительного органа',
        fact1_1: 'Изменение в составе Совета директоров',
        fact2:
            ' Изменение размера участия члена Исполнительного органа в уставном капитале компаний',
        fact2_1:
            'Изменение размера участия члена Совета директоров в уставном капитале компаний',
        fact3: 'Изменение в списке владельцев ценных бумаг',
        fact3_1: 'Изменение в списке владельцев ценных бумаг',
        fact4:
            'Изменения в списке юридических лиц, в которых эмитент владеет 20 и более процентами уставного капитала',
         
        fact5:
            'Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг',
        fact5_1:
            ' Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг',
        fact6:
            'Разовые сделки эмитента, размер которых, либо стоимость имущества по которым составляет 10 и более процентов от активов эмитента на дату сделки',
        
        fact6_1:
            ' Факт заключения договора или иного документа и/или факт государственной регистрации такого договора, предметом которого является приобретение, получение или передача во временное пользование сроком свыше одного года, либо отчуждение недвижимого имущества, независимо от площади недвижимого имущества.',
        fact7:
            ' Факт, повлекший разовое увеличение стоимости активов более чем на 10 процентов',
        fact7_1:'Факт, повлекший разовое уменьшение стоимости активов более чем на 10 процентов',
        fact8:'Факт, повлекший разовое увеличение чистой прибыли более чем на 10 процентов',
        fact8_1: ' Факт, повлекший разовое увеличение чистых убытков более чем на 10 процентов',
        fact9: 'Реорганизация эмитента, его дочерних и зависимых обществ',
        fact10: 'Начисленные доходы по ценным бумагам (дивиденды)',
        fact10_1: 'Выплаченные доходы по ценным бумагам (дивиденды)',
        fact10_2: 'Начисленные доходы по облигациям',
        fact10_3: 'Выплаченные доходы по облигациям',
        fact11: 'Решения общих собраний',
        fact12:'Погашение ценных бумаг эмитента'
      }
        
      
    };
  },
  computed: {
    ...mapState({ items: store => store.report.list }),
    isadmin() {
      if (localStorage.getItem('role') === 'admin') {
        return true;
      }
      return false;
    }
  },

  methods: {
    confirm(id, interrefer, mEntryText, mEntryCompany, type) {
      if (type != 'RKV01' && type != 'RKV02') {
        let name = mEntryCompany + ' : ' + this.factNames[type]
        let titles = this.facts[type];
        this.sendToKSE(mEntryText, name, mEntryCompany, titles, id)
      } else if (type === 'RKV01' || type === 'RKV02') {
        
        this.sendReportKse(mEntryText, id)
      }

      this.$store
        .dispatch('report/confirm', { id, interrefer })
        .then(response => {
          this.getReportList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendReport(id) {
      this.$store
        .dispatch('report/sendReport', id)
        .then(response => {
          this.getReportList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    modal(type, date, name, link = 0) {
      this.date = date;
      this.doctype = type;
      this.companyname = name;
      this.link = link;
    },
    backReport(id) {
      this.$store
        .dispatch('report/backReport', id)
        .then(response => {
          this.getReportList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getReportList() {
      const type = this.selected;

      this.$store
        .dispatch('report/getList', type)
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    },

    sendToKSE(mEntryText, mEntryName, mEntryCompany, title, idfact) {
      let doAddEntry = 'test';
      let BlogId = '3';
      return Queries.test({
        doAddEntry,
        BlogId,
        mEntryText,
        mEntryName,
        mEntryCompany,
        title
      })
        .then(response => {
          let link = response.data;
          this.$store
            .dispatch('report/addLink', { idfact, link})
            .then(response => {})
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    sendReportKse(doc, id) {
      return Queries.addReportInKSE(doc).then( response => {
        console.log(response)
        let link = response.data;
          this.$store
            .dispatch('report/addLink', { id, link})
            .then(response => {})
            .catch(function(error) {
              console.log(error);
            });
      } )
    }
  }
};
</script>

<style>
@media print {
  .modal,
  .modal-dialog {
    height: auto !important;
    min-height: auto !important;
    align-items: end;
  }
  .modal-dialog {
    margin: 0;
  }
  .report-list,
  select,
  .modal-footer,
  .close,
  .print {
    display: none;
  }
}
</style>