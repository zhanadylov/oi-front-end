<template>
  <div>
    <b-select v-model="selected" :options="options" @change="getReportList" class="mb-3">
      <!-- This slot appears above the options from 'options' prop -->
      <template v-slot:first>
        <b-select-option :value="null" disabled>-- Выберите тип документа --</b-select-option>
      </template>
    </b-select>
    <b-table :fields="reportList" bordered hover :items="items" class="report-list" head-variant="light">
      <template #cell(id)="row" v-if="isadmin">{{row.item.sender}}</template>

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
        <router-link :to="`/report/${row.item.id}?type=${row.item.typedoc}`" class="nav-link">
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
              @click="confirm(row.item.id, row.item.sender)"
            >Подтвердить</b-button>
            <b-button variant="outline-primary" v-else>Подтверждено</b-button>
          </span>
        </p>
        <p v-else>
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
            @click="test(row.item.typedoc, row.item.confirmdate, row.item.name)"
            v-b-modal.modal-center
            v-else-if="row.item.status == 3"
            variant="success"
          >Квитанция</b-button>
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
      <p class="my-4">Основание документа:
        <span v-if="doctype == 'RKV01'">Квартальный отчет</span>
        <span v-else-if="doctype == 'RKV02'">Годовой отчет</span></p>
      <p class="my-4">Дата: {{date}}</p>
      <p class="my-4">
        Опубликовано на официальном сайте
        <a href="www.kse.kg">ЗАО "Кыргызская Фондовая Биржа"</a>
      </p>
      <b-button class="print" @click="print" onclick="window.print()">Печать</b-button>
    </b-modal>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'ReportList',
  created() {
    this.getReportList()
  },
  data() {
    return {
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
      ]
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
    
    confirm(id, interrefer) {
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
    test(type, date, name) {
      this.date = date;
      this.doctype = type;
      this.companyname = name;
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
      const type = this.selected
      
        this.$store
        .dispatch('report/getList', type)
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
      
      
    }
  }
};
</script>

<style>
@media print {
  .modal, .modal-dialog {
    height: auto!important;
    min-height: auto!important;
    align-items: end;
  }
  .modal-dialog {
    margin: 0;
  }
  .report-list, select, .modal-footer, .close, .print {
    display: none;
  }
}
</style>