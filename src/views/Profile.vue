<template>
  <div>
    <label for="input-live">Логин:</label>
    <b-form-input
      id="input-live"
      v-model="login"
      :state="loginState"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Введите ваш логин"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">Введите больше 5 символов</b-form-invalid-feedback>
    <label for="input-live">ФИО:</label>
    <b-form-input
      id="input-live"
      v-model="fullname"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      placeholder="Введите ваше ФИО"
      trim
    ></b-form-input>

    <!-- This will only be shown if the preceding input has an invalid state -->
    <b-form-invalid-feedback id="input-live-feedback">Введите больше 5 символов</b-form-invalid-feedback>

    <b-button variant="success" @click="save" class="m-1">Сохранить</b-button>
    {{ff}}
  </div>
</template>

<script>
export default {
  created() {
    this.getUserInfo()
  },
  data() {
    return {
      fullname: '',
      login: '',
      ff: 'ss'
    };
  },
  computed: {
    nameState() {
      return this.fullname.length > 4 ? true : false;
    },
    loginState() {
      return this.login.length > 4 ? true : false;
    }
  },
  methods: {
    getUserInfo() {
      this.$store
        .dispatch('auth/info')
        .then(response => {
            this.ff = response
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    save() {
        let login = this.login
        let fullname = this.fullname

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