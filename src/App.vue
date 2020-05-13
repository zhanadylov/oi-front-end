<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import AuthLayout from "@/layouts/Auth.vue";
import MainLayout from "@/layouts/Main.vue";

export default {
  computed: {
    showAdminBoard() {
      if (localStorage.getItem('role') == 'admin') {
        return true;
      }

      return false;
    },
    layout() {
      return (this.$route.meta.layout || "main") + "-layout"
    }
  },
  components: {
    AuthLayout,
    MainLayout
  }
};
</script>

<style>
.js-fullheight {
  height: 100%;
}
</style>
