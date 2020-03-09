<template>
  <div class="container">
    <strong>Мои отчеты:</strong>

    <ReportList/>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  components: {
    ReportList: () => import("@/components/ReportList.vue")
  }
};
</script>