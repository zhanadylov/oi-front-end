<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Логин: {{content.login}}</h3>
      <h3>ФИО: {{content.fullname}}</h3>
    </header>
    <strong>Документы:</strong>

    <ReportList/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',
  created() {
    this.getMe(), this.getCompanyInfo(), this.getReportList()
  },
  components: {
    ReportList: () => import("@/components/ReportList.vue")
  },
  computed: {
    ...mapState({ content: store => store.auth.me })
  },
  methods: {
    getMe() {
      this.$store.dispatch('auth/info')
      .then(response => {
      })
      .catch(function(error) {
          console.log(error);
        })
    },
    getCompanyInfo() {
      this.$store.dispatch('company/getInfo').then(response => {
      })
      .catch(function(error) {
          console.log(error);
        })
    },
    getReportList() {
      const type = 'fact'
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