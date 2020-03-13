<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- <AdminHead  v-if="showAdminBoard"/>
    <UserHead  v-if="!showAdminBoard"/>-->

    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar">
        <div class="p-4 pt-5" style="position: fixed">
          <ul class="list-unstyled components mb-5">
            <li class="active">
              <a
                href="#homeSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >Home</a>
              <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="#">Home 1</a>
                </li>
                <li>
                  <a href="#">Home 2</a>
                </li>
                <li>
                  <a href="#">Home 3</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">Профиль</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/report" class="nav-link">Создать отчет</router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light col-md-12">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" @click="sidebar" class="btn btn-primary">
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
            <button
              class="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fa fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item">
                  <router-link to="/home" class="nav-link">
                    <font-awesome-icon icon="home" />Home
                  </router-link>
                </li>

                <li class="nav-item" v-if="!currentUser">
                  <router-link to="/login" class="nav-link">
                    <font-awesome-icon icon="sign-in-alt" />Войти
                  </router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href @click.prevent="logOut">
                    <font-awesome-icon icon="sign-out-alt" />Выйти
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// document.getElementById('sidebarCollapse').onclick = function changeContent() {
//   let element = document.getElementById('sidebar');
//   element.classList.toggle('active');
// }

export default {
  computed: {
    showAdminBoard() {
      if (localStorage.getItem('role') == 'admin') {
        return true;
      }

      return false;
    },
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    sidebar() {
      let element = document.getElementById('sidebar')
      element.classList.toggle('active')
    }
  }
  // components: {
  //   AdminHead: () => import("@/components/AdminHead.vue"),
  //   UserHead: () => import("@/components/UserHead.vue")
  // }
};
</script>

<style>
.js-fullheight {
  height: 100%;
}
</style>
