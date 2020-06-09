<template>
  <div class="report">
    <div class="col-3 offset-9 text-right my-3 hide-print" style="z-index: 40;">
      <b-button class="print hide-print" onclick="window.print()">Печать</b-button>
    </div>
    <component :is="isReportView" v-model="report"></component>
    <template v-if="isadmin">
      <b-button class="btn btn-block hide-print" variant="success">Подтвердить</b-button>
      <b-button class="btn btn-block hide-print" @click="rejectReport" variant="danger">Отклонить</b-button>
    </template>
    <template v-else>
      <button class="btn btn-primary btn-block hide-print" v-if="!$route.params.id" @click="submit">
        <span>Сохранить</span>
      </button>
      <button class="btn btn-primary btn-block hide-print" v-else @click="update">Обновить</button>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Report',

  data() {
    return {
      report: [],
      content: []
    };
  },
  metaInfo() {
    return {
      title: this.$title('Отчет')
    }
  },
  components: {
    ReportComponent: () => import('../components/ReportComponent.vue'),
    FactComponent: () => import('../components/FactComponent.vue'),
    FinNadzor: () => import('../components/FinNadzorReport.vue')
  },
  computed: {
    isadmin() {
      if (localStorage.getItem('role') === 'admin') {
        return true;
      }
      return false;
    },
    isReportView() {
      if (this.$route.query.type.indexOf('fact') >= 0) {
        return 'FactComponent';
      }
      else if (this.$route.query.type.indexOf('fin') >= 0) {
        return 'FinNadzor'
      }

      return 'ReportComponent';
    }
  },
  methods: {
    submit() {
      //this.report.typedoc, JSON.stringify(this.report), this.report.reportHead.kod, 'KSE00000'
      let typedoc = this.report.typedoc;
      let xmldoc = JSON.stringify(this.report);
      let sender = this.report.reportHead.kod;
      let status = 1;
      let kvartal = this.report.kvartal
      this.$store
        .dispatch('report/insert', { typedoc, xmldoc, sender, status, kvartal })
        .then(response => {
          this.$router.push('/reporting');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update() {
      let id = this.$route.params.id;
      let doc = this.report;
      this.$store
        .dispatch('report/updateReport', { id, doc })
        .then(response => {
          this.$router.push('/reporting');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rejectReport() {
      let id = this.$route.params.id;
      this.$store
        .dispatch('report/rejectReport', id)
        .then(response => {
          this.$router.push('/reporting');
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
@media print {
  .hide-print {
    display: none;
  }
}
</style>