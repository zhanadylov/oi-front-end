<template>
  <div class="container">
    <header class="jumbotron" >
      <h4 v-if="whoAmI">Наименование компании: {{info}}</h4>
      <h4 v-else>Государственная служба регулирования и надзора за финансовым рынком при Правительстве КР</h4>
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
      info: ''
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
    ...mapState({ content: store => store.auth.me }),
    whoAmI() {
      if (localStorage.getItem('role') == 'fin')
        return false
      return true
    }
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
        this.info = this.$store.state.company.info.name
      })
      .catch(function(error) {
          console.log(error);
        })
    }
  }
};
</script>

<style>

@media print {
  .jumbotron {
    display: none;
  }
}

@media (min-width: 576px) {

.jumbotron {
    padding: 2rem!important;
}

}
</style>