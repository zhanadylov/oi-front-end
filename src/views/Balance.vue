<template>
     <div class="balance">
        <div class="col-5 offset-7 text-right my-3">
        <b-col sm="12">
          <h5 class="d-inline">«ОАО Оптима Банк»</h5>
        </b-col>
        <b-col sm="12">
          <p class="d-inline">
            Отчет о Финансовом положении
            <br />на 30 июня 2020 года (включительно)
          </p>
        </b-col>
      </div>
      <div class="StructuraBalance">
        <b-table
          bordered
          hover
          :items="StructuraBalanc"
          :fields="tblStructuraBalancefields"
          head-variant="light"
        >
          <template #cell(Description)="row">
            <input type="text" v-model="row.item.Description" />
          </template>
          <template #cell(Fromm)="row">
            <input type="text" v-model="row.item.Fromm" />
          </template>
          <template #cell(Too)="row">
            <input type="text" v-model="row.item.Too" />
          </template>
        </b-table>
      </div>
    </div>
</template>

 <script>
import BalanceData from '../mixins/BalanceData.js';
export default {
  name: 'Balance.vue',
  mixins: [BalanceData],
  data(){
    return{
            StructuraBalanc: [
            { Description: 'Процентные доходы, расчитанные с использованием метода эффективной процентной стаки: ', Fromm: '', Too: '' },
            { Description: 'Процентыне расходы: ', Fromm: '', Too: '' },
            { Description: 'Чистый процентный доход: ', Fromm: '', Too: '' },
            { Description: 'Комиссионные доходы: ', Fromm: '', Too: '' },
         ],
        };
    }
}
 </script>  