<template>
  <div class="changePass">
    <h4 style="text-align: center">Рекомендация на смену пароля</h4>
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
        <input class="form-input" id="password" v-model="pass" type="password" />
        <label class="form-label" for="password">Пароль</label>
        <div class="form-input-lock" v-html="passChech"></div>
      </div>
      <br />
      <br />
      <button class="save" id="save" disabled @click="save">сохранить</button>
      <b-form-group>
      <b-form-radio v-show="content.use == null" v-model="use" name="some-radios" value="1">Принимаю условия использования сайта</b-form-radio>
    </b-form-group>
      <b-button style="display:none" id="modalbtn" v-b-modal.modal-scrollable>Пользовательское соглашение</b-button>
      <p v-show="content.use == null"><label style="color:#007bff" for="modalbtn"> Договор оферты</label></p>
      <b-modal id="modal-scrollable" size="xl" scrollable title="Условия использования">
        <h4>
          Договор-оферта по передаче существенных фактов эмитентов
          через электронную систему ЗАО «Кыргызская фондовая биржа»
        </h4>
        <p>
          г. Бишкек - 2020 год
          <br />Настоящий Договор является публичной офертой и определяет порядок предоставления эмитентом КР информации о существенных фактах через электронную систему ЗАО «Кыргызская фондовая биржа», перечень и сроки предоставления которых установлен Законом КР «О рынке ценных бумаг» и Положением «О порядке предоставления отчетности (информации) и раскрытии информации субъектами финансового рынка», а также определяет порядок взаимодействия между ЗАО «Кыргызская фондовая биржа» и эмитентом, принявшим публичное предложение (оферту) о заключении настоящего Договора.
        </p>
        <h5>1. ТЕРМИНЫ И ОПРЕДЕЛЕНИЯ</h5>

        <p>
          1.1. Для целей настоящего Договора используются следующие термины и определения:
          <br />Заказчик – эмитент КР являющийся публичной компанией согласно законодательства КР;
          <br />Исполнитель – ЗАО «Кыргызская фондовая биржа» (ЗАО «КФБ»);
          <br />Электронная система – программно-технический комплекс ЗАО «КФБ» по удаленной передаче информации, доступный по ссылке oi.kse.kg, в котором для каждого эмитента имеется свой личный кабинет;
          <br />Оферта – публичный Договор, адресованный эмитентам КР, о передаче информации о существенных фактах, предоставляемым согласно нормативно-правовым актам КР в порядке уведомления на фондовую биржу;
          <br />Акцепт – принятие оферты путем подтверждения в личном кабинете программы ЗАО «КФБ». Акцепт оферты создает Договор.
        </p>

        <h5>2. ПРЕДМЕТ ДОГОВОРА</h5>

        <p>2.1. Предметом настоящего Договора является безвозмездная передача Заказчиком Исполнителю информации о существенных фактах, предусмотренных нормативными актами КР, через электронную систему Исполнителя в соответствии с условиями настоящего Договора.</p>

        <h5>3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h5>

        <p>
          3.1. Заказчик обязуется:
          <br />3.1.1. Произвести акцепт оферты в личном кабинете.
          <br />3.1.2. Направлять Исполнителю информацию о существенных фактах согласно порядку и условиям, установленным нормативно-правовыми актами КР.
          <br />3.1.2. Соблюдать правила работы с электронной системой ЗАО «КФБ» согласно практическому руководству.
          <br />3.2. Исполнитель обязуется:
          <br />3.2.1. Предоставить доступ (Логин, Пароль) к электронной системе ЗАО «КФБ» для удаленной передачи информации о существенных фактах.
          <br />3.2.2. Размещать информацию о существенных фактах, полученную от Заказчика, в день получения на своем официальном сайте (www.kse.kg).
          <br />3.3. Заказчик имеет право:
          <br />3.3.1. Вносить предложения и рекомендации по работе электронной системы ЗАО «КФБ».
          <br />3.4. Исполнитель имеет право:
          <br />3.4.1. Вносить изменения и дополнения в настоящий Договор, о которых Заказчик считается должным образом уведомленным, с момента размещения измененной версии Договора в личном кабинете Заказчика.
          <br />
        </p>

        <h5>4. ОТВЕТСТВЕННОСТЬ СТОРОН И РАЗРЕШЕНИЕ СПОРОВ</h5>

        <p>
          4.1. Ответственность Исполнителя:
          <br />4.1.1. Исполнитель несет ответственность за неисполнение или ненадлежащее исполнение условий настоящего Договора.
          <br />4.1.2. Исполнитель не несет ответственность за достоверность предоставленной Заказчиком информации и нарушение сроков предоставления информации о существенных фактах.
          <br />4.1.3. Исполнитель не вправе редактировать и исправлять информацию, предоставленную Заказчиком.
          <br />4.2. Ответственность Заказчика:
          <br />4.2.1. Заказчик несет ответственность за достоверность предоставляемой Исполнителю информации и соответствие информации законодательству и нормативно-правовым актам КР.
          <br />4.3. Ответственность по настоящему Договору применяется к Стороне по Договору только по письменной инициативе другой Стороны.
          <br />4.4. Все споры и разногласия, возникшие из настоящего Договора, разрешаются путем переговоров.
          <br />4.5. В случае не достижения согласия путем переговоров, споры разрешаются в соответствии с действующим законодательством КР.
          <br />4.6. При возникновении обстоятельств непреодолимой силы (форс-мажор) срок выполнения Сторонами своих обязательств по настоящему Договору переносится на период действия таких обстоятельств.
          <br />
        </p>

        <h5>5. СРОК ДЕЙСТВИЯ ДОГОВОРА И ПОРЯДОК РАСТОРЖЕНИЯ</h5>

        <p>
          5.1. Настоящий Договор вступает в силу с момента акцепта оферты эмитентом и действует до 31 декабря 2020 года. В дальнейшем Договор продлевается на очередной календарный год новым акцептом, в ином случае расторгается.
          <br />5.2. Расторжение Договора может быть произведено в одностороннем порядке путем направления одной Стороны другой письменного уведомления не менее чем за 10 календарных дней до предполагаемой даты расторжения.
          <br />
        </p>

        <h5>6. ПРОЧИЕ УСЛОВИЯ</h5>
        <p>
          6.1. Стороны соглашаются с тем, что настоящий Договор заключен по юридическому адресу нахождения Исполнителя, не требует скрепления печатями и подписания.
          <br />6.2. Стороны безоговорочно признают юридическую силу текста настоящего Договора.
          <br />6.3. По всем вопросам, не урегулированным настоящим Договором, стороны руководствуются действующим законодательством Кыргызской Республики.
          <br />
        </p>

        <h5>7. РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</h5>

        <b>ЗАО «Кыргызская фондовая биржа»</b>
        <p>
          Р/С 1181000300048339 ФЗАО
          <br />ДКИБ-Главный, г.Бишкек
          <br />БИК 118005, 002 Ленинская
          <br />ИНН 02908199410061
          <br />Адрес: 720010, г. Бишкек, ул. Московская,172
          <br />Тел.: 31-14-84, 31-15-01, факс: 31-14-83.
          <br />
        </p>
        <b>
          И.о. Президента
          <br />Назаралиев М.Т.
        </b>
      </b-modal>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';
export default {
  
  created() {
    this.getMe()
  },
  computed: {
    ...mapState({ content: store => store.auth.me }),

    minCharCheck() {
      if (this.pass.length < 8) {
        this.countItem(3, 0);
        return this.checkFalse;
      }
      this.countItem(3, 1);
      return this.checkTrue;
    },

    numCheck() {
      let numbers = this.pass.match(/(\d+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        this.countItem(2, 0);
        return this.checkFalse;
      }
      this.countItem(2, 1);
      return this.checkTrue;
    },

    upCheck() {
      let numbers = this.pass.match(/([A-Z]+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        this.countItem(0, 0);
        return this.checkFalse;
      }
      this.countItem(0, 1);
      return this.checkTrue;
    },

    lowCheck() {
      let numbers = this.pass.match(/([a-z]+)/g); // массив с числами str.matches("A-Z")
      if (!numbers) {
        this.countItem(1, 0);
        return this.checkFalse;
      }
      this.countItem(1, 1);
      return this.checkTrue;
    },

    passChech() {
      if (
        this.items[0].status == false ||
        this.items[1].status == false ||
        this.items[2].status == false ||
        this.items[3].status == false ||
        this.use == 0
      ) {
        //document.getElementById('save').setAttribute("disabled", "disabled")
        return this.passFalse;
      }
      document.getElementById('save').removeAttribute('disabled');
      return this.passTrue;
    },


  },
  data() {
    return {
      use: 0, //this.$store.use,
      items: [
        { status: false /*upperCase*/ },
        { status: false /**lowerCase */ },
        { status: false /*number*/ },
        { status: false /*minChar*/ },
      ],
      pass: '',
      checkFalse:
        '<svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#FFFFFF"></path></svg>',
      checkTrue:
        '<svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline class="check" points="1,7 5,11 13,1" fill="none" stroke="#FFFFFF" stroke-width="2px" stroke-linecap="round"></polyline></svg>',
      passTrue:
        '<svg xmlns="http://www.w3.org/2000/svg" class="lock-icon locked" width="20" height="20"><path d="M4 8V6a6 6 0 1112 0v2h400a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h400zm5 6.73V17h2v-2.27a2 2 0 10-2.009-.005L9 14.73zM7 6v2h6V6a3 3 0 10-6 0z"></path></svg>',
      passFalse:
        '<svg xmlns="http://www.w3.org/2000/svg" class="lock-icon false" width="20" height="20"><path d="M4 8V6a6 6 0 1112 0h-3v2h4a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8c0-1.1.9-2 2-2h400zm5 6.73V17h2v-2.27a2 2 0 10-2.009-.005L9 14.73zM7 6v2h6V6a3 3 0 10-6 0z"></path></svg>',
    };
  },

  methods: {
    getMe() {
      this.$store.dispatch('auth/info')
      .then(response => {
      })
      .catch(function(error) {
          console.log(error);
        })
    },
    save() {
      let password = this.pass;
      let use
      if (this.content.use == null)
        use = this.use
      else
        use = 1
      if (
        this.items[0].status == true ||
        this.items[1].status == true ||
        this.items[2].status == true ||
        this.items[3].status == true
      ) {
        this.$store
          .dispatch('auth/updatepassword', {password, use})
          .then(() => {
            this.$router.push('/reporting');
          })
          .catch(function (error) {
            (error.response && error.response.data) ||
              error.message ||
              error.toString();
          });
      }
    },

    countItem(i, type) {
      if (type == 1) return (this.items[i].status = true);
      return (this.items[i].status = false);
    }
  },
};
</script>

<style lang="scss">
:root {
  --blue: #007bff;
  --green: hsl(148, 26%, 48%);
  --light-green: hsl(149, 34%, 88%);
  --white: hsl(0, 0%, 100%);
  --space: 20px;
  --color: hsl(0, 0%, 20%);
  --color-focus: hsl(0, 0%, 50%);
  --transition: all 0.2s ease-out;
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
  text-shadow: 0 0 0 var(--blue);
  text-transform: uppercase;
  border: none;
}

.validation-box {
  padding: var(--space);
  background: var(--blue);
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
  color: hsla(0, 0%, 100%, 80%);
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
  border: none;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: 8px;
  font-size: 2.4em;
  height: 60px;
  overflow: hidden;
  color: transparent;
  text-shadow: 0 0 0 var(--blue);
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