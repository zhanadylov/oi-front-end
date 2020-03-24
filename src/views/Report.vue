<template>
  <div class="report">
    <ReportComponent v-model="report" />
    {{report}}
    <template v-if="isadmin">
      <b-button class="btn btn-block" variant="success">Подтвердить</b-button>
      <b-button class="btn btn-block" @click="rejectReport" variant="danger">Отклонить</b-button>
    </template>
    <template v-else>
      <button class="btn btn-primary btn-block" v-if="!$route.params.id" @click="submit">
        <span>Сохранить</span>
      </button>
      <button class="btn btn-primary btn-block" v-else @click="update">Обновить</button>
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
  components: {
    ReportComponent: () => import('../components/ReportComponent.vue')
  },
  computed: {
    isadmin() {
      if (localStorage.getItem('role') === 'admin') {
        return true;
      }
      return false;
    }
  },
  methods: {
    submit() {
      //this.report.typedoc, JSON.stringify(this.report), this.report.reportHead.kod, 'KSE00000'
      let typedoc = this.report.typedoc;
      let xmldoc = JSON.stringify(this.report);
      let sender = this.report.reportHead.kod;
      let status = 1;
      this.$store
        .dispatch('report/insert', { typedoc, xmldoc, sender, status })
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
      let id = this.$route.params.id
      this.$store
      .dispatch('report/rejectReport', id)
      .then(response => {
          this.$router.push('/reporting')
        })
        .catch(function(error) {
          console.log(error);
        })
    }
  }
};
</script>
