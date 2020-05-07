<template>
  <div class="Company">
    <b-form-group id="input-group-1" label="Имя компании:" label-for="input-1">
      <b-form-input id="input-1" v-model="content.name" required placeholder="Имя компании"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-2" label="Организационно-правовая форма:" label-for="input-2">
      <b-form-input id="input-2" v-model="content.opforma" required placeholder="Организационно-правовая форма"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-3" label="Основной вид деятельности:" label-for="input-3">
      <b-form-input id="input-3" v-model="content.activity" required placeholder="Основной вид деятельности"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-4" label="Юридический и почтовый адрес:" label-for="input-4">
      <b-form-input id="input-4" v-model="content.address" required placeholder="Адрес"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-5" label="Телефон:" label-for="input-5">
      <b-form-input id="input-5" v-model="content.phone" required placeholder="Телефон"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-6" label="Факс:" label-for="input-6">
      <b-form-input id="input-7" v-model="content.fax" required placeholder="Факс"></b-form-input>
    </b-form-group>
    <b-form-group id="input-group-8" label="E-mail:" label-for="input-8">
      <b-form-input id="input-8" v-model="content.email" required placeholder="E-mail"></b-form-input>
    </b-form-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Company',
  data() {
    return {
      result: {}
    };
  },
  computed: {
    ...mapState({ content: store => store.company.info })
  }
};
</script>