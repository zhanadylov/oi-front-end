<template>
  <div class="changePass">
    <h4 style="text-align: center">Вам необходимо сменить пароль</h4>
    <div class="form-box">
      <ul class="validation-box">
        <li class="done validation-item">
          <span class="validation-icon" v-html="upCheck"></span>Большие буквы
        </li>
        <li class="done validation-item">
          <span class="validation-icon" v-html="lowCheck"></span>Маленькие буквы
        </li>
        <li class="done validation-item">
          <span class="validation-icon" v-html="numCheck"></span>Число
        </li>
        <li class="done validation-item">
          <span class="validation-icon" v-html="minCharCheck"></span>Больше 8 символов
        </li>
      </ul>
      <div class="form-field">
        <input class="form-input" id="password" v-model="pass" type="text" />
        <label class="form-label" for="password">Пароль</label>
        <div class="form-input-lock">
          <svg xmlns="http://www.w3.org/2000/svg" class="lock-icon locked" width="20" height="20">
            <path
              d="M4 8V6a6 6 0 1112 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 10-2.009-.005L9 14.73zM7 6v2h6V6a3 3 0 10-6 0z"
            />
          </svg>
        </div>
      </div>
      <br />
      <br />
      <button class="save" @click="save">сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    minCharCheck() {
      if (this.pass.length < 8) {
        return this.checkFalse;
      }
      return this.checkTrue;
    },

    numCheck() {
      let numbers = this.pass.match(/(\d+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        return this.checkFalse;
      }
      return this.checkTrue;
    },

    upCheck() {
      let numbers = this.pass.match(/([A-Z]+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        return this.checkFalse;
      }
      return this.checkTrue;
    },

    lowCheck() {
      let numbers = this.pass.match(/([a-z]+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        return this.checkFalse;
      }
      return this.checkTrue;
    },
  },
  data() {
    return {
      upperCase: 0,
      lowerCase: 0,
      number: 0,
      minChar: 0,
      pass: '',
      checkFalse:
        '<svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#5B9A78"></path></svg>',
      checkTrue:
        '<svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline class="check" points="1,7 5,11 13,1" fill="none" stroke="#FFFFFF" stroke-width="2px" stroke-linecap="round"></polyline></svg>',
    };
  },

  methods: {
    save() {
      let password = this.pass

      this.$store
        .dispatch('auth/updatePassword',  password)
        .then(() => {
            console.log('res')
        })
        .catch(function (error) {
          (error.response && error.response.data) ||
                error.message ||
                error.toString();
        });
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

:root {
  --dark-green: hsl(147, 26%, 27%);
  --green: hsl(148, 26%, 48%);
  --light-green: hsl(149, 34%, 88%);
  --white: hsl(0, 0%, 100%);
  --space: 20px;
  --color: hsl(0, 0%, 20%);
  --color-focus: hsl(0, 0%, 50%);
  --transition: all 0.2s ease-out;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
html {
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1;
  color: var(--color);
}

.form-box {
  width: 320px;
  margin: 0 auto;
}

.save {
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;
  speak: none;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 8px;
  font-size: 1.4em;
  height: 60px;
  width: 320px;
  font-weight: 500;
  overflow: hidden;
  color: transparent;
  text-shadow: 0 0 0 var(--green);
  text-transform: uppercase;
}

.validation-box {
  padding: var(--space);
  background: var(--dark-green);
  margin-bottom: var(--space);
  border-radius: 8px;
  -webkit-box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
  list-style: none;
  font-size: 0.875em;
  font-weight: 600;
  color: var(--white);
}

.validation-item {
  position: relative;
  padding-left: calc(var(--space) + 8px);
}

.validation-item:not(:last-child) {
  margin-bottom: 16px;
}

.validation-item.done {
  color: hsla(0, 0%, 100%, 40%);
}

.validation-icon {
  position: absolute;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  left: 0px;
}

.check {
  stroke-dasharray: 45;
  stroke-dashoffset: 45;
  animation: check 0.2s 0.1s ease-in-out forwards;
}

@keyframes check {
  0% {
    stroke-dashoffset: 45;
  }
  100% {
    stroke-dashoffset: 20;
  }
}

.form-field {
  display: flex;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  -webkit-box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 10px 43px 0px rgba(0, 0, 0, 0.12);
}

.form-field:active {
  transform: scale(0.98);
  transition: var(--transition);
}

@font-face {
  font-family: 'fontello';
  src: url('../assets/fontello.eot');
  src: url('../assets/fontello.eot')
      format('embedded-opentype'),
    url('../assets/fontello.woff')
      format('woff'),
    url('../assets/fontello.ttf')
      format('truetype');
  font-weight: normal;
  font-style: normal;
}

.form-input {
  padding-left: var(--space);
  padding-bottom: 2px;
  padding-top: 25px;
  padding-right: 80px;
  width: 100%;
  font-size: 18px;
  font-family: 'fontello';
  font-style: normal;
  font-weight: normal;
  speak: none;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 8px;
  font-size: 2.4em;
  height: 60px;
  overflow: hidden;
  color: transparent;
  text-shadow: 0 0 0 var(--green);
}

.form-label {
  position: absolute;
  font-size: 120%;
  padding-left: var(--space);
  transition: var(--transition);
  width: calc(100% - 80px);
  border-radius: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  z-index: 1;
}

.form-input:focus {
  outline: none;
}

.form-input:focus + .form-label {
  font-size: 0.875em;
  color: var(--color-focus);
  background-color: transparent;
  top: 20px;
}

.form-label::before {
  content: '';
  position: absolute;
  height: 340%;
  top: -25px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--white);
  z-index: -1;
  transition: var(--transition);
}

.form-input:focus + .form-label::before {
  background-color: transparent;
  opacity: 0;
}

.form-input-lock {
  position: absolute;
  height: 100%;
  width: 80px;
  right: 0;
}

.lock-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  transition: all 0.3s cubic-bezier(0.16, 0.92, 0.31, 1.85);
}

.lock-icon path {
  fill: var(--green);
  opacity: 0.4;
}

.lock-icon.locked {
  transform: translate(-50%, -50%) scale(1.4);
  transform-origin: center;
}

.lock-icon.locked path {
  opacity: 1;
}

@media only screen and (max-height: 320px) {
  .validation-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }
  .validation-item {
    width: 40%;
  }
}
</style>