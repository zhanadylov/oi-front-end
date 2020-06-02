<template>
  <div>
    <label for="input-live-login">Логин:</label>
    <b-form-input
      id="input-live-login"
      v-model="content.login"
      placeholder="Введите ваш логин"
      trim
    ></b-form-input>



    <label for="input-live">ФИО:</label>
    <b-form-input
      id="input-live"
      v-model="content.fullname"
      placeholder="Введите ваше ФИО"
      trim
    ></b-form-input>


    <b-button variant="success" @click="save" class="m-1">Сохранить</b-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapState({ content: store => store.auth.me })
  },
  methods: {
    getUserInfo() {
      this.$store
        .dispatch('auth/info')
        .then(response => {
        })
    },

    save() {
        let login = this.content.login
        let fullname = this.content.fullname

        this.$store
        .dispatch('auth/update', {login, fullname})
        .then(response => {
          this.getUserInfo()
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>