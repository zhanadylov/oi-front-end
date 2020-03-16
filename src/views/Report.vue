<template>
  <div class="report">
    <ReportComponent v-model="report" />
    {{report}}
    <button class="btn btn-primary btn-block" v-if="!$route.params.id" @click="submit">
      <span>Сохранить</span>
    </button>
    <button class="btn btn-primary btn-block" v-else @click="update">
      Обновить
    </button>
  </div>
</template>

<script>

export default {
  name: 'Report',

  data() {
    return {
      report: []
    };
  },
  components: {
    ReportComponent: () => import('../components/ReportComponent.vue')
  },
  methods: {
    submit() {
      //this.report.typedoc, JSON.stringify(this.report), this.report.reportHead.kod, 'KSE00000'
      let typedoc = this.report.typedoc
      let xmldoc = JSON.stringify(this.report)
      let sender = this.report.reportHead.kod
      let status = 1
      this.$store
        .dispatch('report/insert', {typedoc, xmldoc, sender, status})
        .then(response => {
          this.$router.push('/profile');
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update() {
      let id =this.$route.params.id
      let doc = this.report
      this.$store
      .dispatch('report/updateReport', {id, doc})
      .then(response => {
          this.$router.push('/profile');
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
