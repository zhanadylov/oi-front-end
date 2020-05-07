<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar">
      <div class="p-3 pt-5" style="position: fixed">
        <ul class="list-unstyled components mb-5">
          <li class="nav-item">
            <router-link to="/company" class="nav-link">Профиль компании</router-link>
          </li>

          <li class="active">
            <a
              href="#factsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Мои документы</a>
            <ul class="collapse list-unstyled" id="factsSubmenu">
              <li>
                <router-link to="/report" class="nav-link">Создать отчет</router-link>
              </li>
              <li>
                <router-link to="/reporting" class="nav-link">Архив отчетов</router-link>
              </li>
              <li>
                <router-link to="/facts" class="nav-link">Существенные факты</router-link>
              </li>
              <li>
                <router-link to="/" class="nav-link">Архив фактов</router-link>
              </li>
            </ul>
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
</template>

<script>
export default {
  methods: {
    sidebar() {
      let element = document.getElementById('sidebar');
      element.classList.toggle('active');
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>