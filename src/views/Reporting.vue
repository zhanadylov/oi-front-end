<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Логин: {{content.login}}</h3>
      <h3>ФИО: {{content.fullname}}</h3>
    </header>
    <strong>Мои отчеты:</strong>

    <ReportList/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',
  created() {
    this.getMe()
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
    }
  }
};
</script>