<template>
  <div class="ReportLayout col-md-12">

    <div class="table-div ">
      <b-table-simple hover bordered small stacked>
        <thead>
          <tr>
            <th
              v-for="(item, index) in arr.head"
              :key="index"
              :rowspan="item.rowspan"
              :colspan="item.colspan"
            >{{item.text}}</th>
          </tr>
          <tr>
            <th v-for="(item, index) in arr.head2" :key="index">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="n in arr.body.count" :key="n">
              <input type="text" class="input"/>
            </td>
          </tr>
        </tbody>
      </b-table-simple>
    </div>
    <button class="btn btn-primary btn-block hide-print" @click="save">
        <span>Сохранить</span>
      </button> 
  </div>
</template>

<script>
import forms from '../models/forms.js';
export default {
  name: 'ReportLayout',
  //mixins: [forms],
  created() {
    this.test()
  },
  data() {
    return {
      arr: {}
    };
  },
  methods: {
    test() {
      this.arr = forms.form1()
      
    },
    save() {
      let inputs = document.getElementsByClassName('input');

      this.arr = [];

      for (let i = 0; i < inputs.length; i++) {
        this.arr.push(inputs[i].value);
      }
    }
  }
};
</script>

<style>
.table-div {
  overflow: auto;
    position: absolute;
    width: 100%;
}
.ReportLayout {
  position: relative;
}

</style>
