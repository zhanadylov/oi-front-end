<template>
  <div id="app">
    <AdminHead  v-if="showAdminBoard"/>
    <UserHead  v-if="!showAdminBoard"/>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showAdminBoard() {
      if (localStorage.getItem('role') == 'admin') {
        return true;
      }

      return false;
    }
  },
  components: {
    AdminHead: () => import("@/components/AdminHead.vue"),
    UserHead: () => import("@/components/UserHead.vue")
  }
};
</script>
