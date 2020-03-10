<template>
  <div>
    <b-table :fields="reportList" bordered hover :items="items" head-variant="light">
      <template #cell(status)="row">
        <span v-if="row.item.status == 1">Редактирование</span>
        <span v-else-if="row.item.status == 2">Готов к отправке</span>
        <span v-else-if="row.item.status == 3">Принят</span>
      </template>
      <template #cell(typedoc)="row">
        <span>
          <a :href="`/report/${row.item.id}`">{{ row.item.typedoc }}</a>
        </span>
      </template>
      <template #cell(refer)="row" >
        <p v-if="isadmin">
          <span v-if="row.item.typedoc !== 'KVIT01'">
            <b-button
              v-if="row.item.refer == null"
              @click="confirm(row.item.id, row.item.sender)"
            >Подтвердить</b-button>
            <b-button v-else>Подтверждено</b-button>
          </span>
        </p>
        <p v-else>
          <b-button v-if="row.item.status == 2">Отправить</b-button>
        </p>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'ReportList',
  created() {
    this.getReportList();
  },
  data() {
    return {
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
          key: 'datedoc',
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
      // items: [
      //   {
      //     aaa: 0,
      //     ddd: '',
      //     datedoc: '',
      //     typedoc: 'ss'
      //   }
      // ]
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
    getReportList() {
      this.$store
        .dispatch('report/getList')
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    },
    confirm(id, interrefer) {
      this.$store
        .dispatch('report/confirm', { id, interrefer })
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>