<template>
  <div>
      <div class="col-5 offset-7 text-right my-3">
        
          <b-col sm="12">
              <h5 class="d-inline">Руководитель </h5><p class="d-inline"> {{content.sepervisor.dir}} _______________</p>
          </b-col>
          
          <br>
          <b-col sm="12">
              <h5 class="d-inline">Главный бухгалтер </h5><p class="d-inline"> {{content.sepervisor.buh}} _______________</p>
          </b-col>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Supervisor',
  created() {
    this.getCompanyInfo()
  },
  computed: {
    ...mapState({ content: store => store.company.info })
  },
  methods: {
    getCompanyInfo() {
      this.$store
        .dispatch('company/getInfo')
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>