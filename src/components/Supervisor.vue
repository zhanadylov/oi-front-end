<template>
  <div>
    <br><br>
    <div class="col-7 my-3">
      <b-col sm="12" v-show="content.sepervisor.dir">
        <h5 class="d-inline">
          <span v-if="content.sepervisor.position">{{content.sepervisor.position + ' ' + content.sepervisor.dir}}</span> 
          <span v-else>Руководитель {{content.sepervisor.dir}}</span> 
        </h5>
      </b-col>
      <!-- <br />
      <b-col sm="12" v-show="dir != ''">
        <h5 class="d-inline">Руководитель {{content.sepervisor.dir}}</h5>
      </b-col> -->

      <br />
      <b-col sm="12"  v-show="content.sepervisor.buh">
        <h5 class="d-inline">Главный бухгалтер {{content.sepervisor.buh}}</h5>
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
  computed: {
    ...mapState({ content: store => store.company.info })
  },
  methods: {
    getCompanyInfo() {
      if (localStorage.getItem('role') == 'user') {
        this.$store
          .dispatch('company/getInfo')
          .then(response => {
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>