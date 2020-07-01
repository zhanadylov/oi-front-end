<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  created() {
    this.getMe()
  },
  metaInfo() {
    return {
      title: this.$title('Раскрытие информации')
    };
  },
  methods: {
    getMe() {
      this.$store
        .dispatch('auth/info')
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
