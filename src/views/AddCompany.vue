<template>
  <div>
    <b-form-group id="input-group-1" label="Имя компании:" label-for="input-1">
      <b-form-input id="input-1" v-model="name" placeholder="Имя компании"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-1" label="Код компании:" label-for="input-1">
      <b-form-input id="input-1" v-model="kod" placeholder="Код компании"></b-form-input>
    </b-form-group>
    <b-button @click="add">Добавить</b-button>
  </div>
</template>

<script>
export default {
  name: 'AddCompany',
  data() {
    return {
      name: '',
      kod: ''
    };
  },
  methods: {
    add() {
      let name = this.name;
      let kod = this.kod;
      this.$store
        .dispatch('company/addCompany', {
          name,
          kod
        })
        .then(response => {
          console.log(response);
          let login = kod
          let idcompany = response.idCompany
          this.$store
            .dispatch('company/addUser', {
              login,
              idcompany
            })
            .then(response => {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>