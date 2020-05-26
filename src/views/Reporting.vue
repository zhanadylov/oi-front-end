<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Логин: {{content.login}}</h3>
      <h3>ФИО: {{content.fullname}}</h3>
      <h3>Компания: {{info}}</h3>
    </header>
    <ReportList/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Profile',
  created() {
    this.getMe(), this.getCompanyInfo()
  },
  data() {
    return {
      type: 'RKV',
      info: this.$store.state.company.info.name
    }
  },
  metaInfo() {
    return {
      title: this.$title('Архив')
    }
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
    }
  }
};
</script>