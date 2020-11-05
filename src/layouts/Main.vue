<template>
  <div class="wrapper d-flex align-items-stretch">
    <nav id="sidebar" v-show="isFin">
      <div class="p-3 pt-5" style="position: fixed">
        <ul class="list-unstyled components mb-5">
          <li class="nav-item">
            <router-link to="/company" class="nav-link">Профиль компании</router-link>
          </li>

          <!-- <li class="nav-item">
            <router-link to="/profile" class="nav-link">Личный кабинет</router-link>
          </li> -->

          <li class="active">
            <a
              href="#factsSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              class="dropdown-toggle"
            >Мои документы</a>
            <ul class="collapse list-unstyled" id="factsSubmenu">
              <!-- <li>
                <router-link to="/report?type=report" class="nav-link">Создать отчет</router-link>
              </li> -->
              <li>
                <router-link to="/reporttype" class="nav-link">Создать отчет</router-link>
              </li>
              <li>
                <router-link to="/facts" class="nav-link">Существенные факты</router-link>
              </li>
              
              <li>
                <router-link to="/reporting" class="nav-link">Архив</router-link>
              </li>
            </ul>
          </li>
           <li class="nav-item">
            <router-link to="/acts" class="nav-link">Нормативные акты</router-link>
          </li>
          
          <li>
            <a target="_blank" href="https://drive.google.com/file/d/1zriC0IQPGTGqjO1ifmeJydF0TDI0cEtQ/view?usp=sharing">Руководство</a>
          </li>
             <li class="nav-item">
            <router-link to="/cart" class="nav-link">Корзина</router-link>
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
                <router-link to="/reporting" v-show="!isFin" class="nav-link">
                  Архив
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/addcompany" v-show="isAdmin" class="nav-link">
                  Добавить компанию
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/home" class="nav-link">
                  Home
                </router-link>
              </li>

              <li class="nav-item" v-if="!currentUser">
                <router-link to="/login" class="nav-link">
                  Войти
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href @click.prevent="logOut">
                  Выйти
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
      window.location.href = '/login';
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.status.loggedIn;
    },

    isFin() {
      if (localStorage.getItem('fin') ) {
        return false
      }
      return true
    },

    isAdmin() {
      if (localStorage.getItem('role') == 'admin' && !localStorage.getItem('fin')) {
        return true
      }

      return false
    }, //Cart
    isadminCart() {
      if (localStorage.getItem('role') === 'admin') {
        return true;
      }
      return false;
    },
  }
};
</script>
