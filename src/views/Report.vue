<template>
  <div class="report">
    <ReportComponent v-model="report" />
    {{report}}
    <button class="btn btn-primary btn-block" @click="submit">
      <span>Отправить</span>
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
      let reciver = 'KSE00000'
      let status = 1
      this.$store
        .dispatch('report/insert', {typedoc, xmldoc, sender, reciver, status})
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
