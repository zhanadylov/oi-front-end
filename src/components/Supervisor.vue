<template>
  <div>
    <br><br>
    <div class="col-5 my-3">
      <b-col sm="12" v-show="dir != ''">
        <h5 class="d-inline">Руководитель {{dir}}</h5>
      </b-col>

      <br />
      <b-col sm="12"  v-show="buh != ''">
        <h5 class="d-inline">Главный бухгалтер {{buh}}</h5>
      </b-col>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Supervisor',
  created() {
    this.getCompanyInfo();
  },
  data() {
    return {
      dir: '',
      buh: ''
    }
  },
  methods: {
    getCompanyInfo() {
      if (localStorage.getItem('role') == 'user') {
        this.$store
          .dispatch('company/getInfo')
          .then(response => {
            this.dir = response
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>