<template>
  <div class="container">
    <header class="jumbotron">
    </header>

    <strong>Отчеты</strong>
    <ReportList/>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  
  components: {
    ReportList: () => import("@/components/ReportList.vue")
  }
};
</script>
