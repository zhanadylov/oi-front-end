<template>
  <div class="anex-2">
    
    <div class="col-3 offset-9 text-right my-3 hide-print" style="z-index: 40;">
      <b-button class="print hide-print" onclick="window.print()">Печать</b-button>
    </div>
    <template v-if="!EditReport">
      <div class="anex2-block"></div>
    </template>
    <div class="col-5 offset-7 text-right my-3">
      <b-col sm="12">
        <h5 class="d-inline">Приложение 2</h5>
      </b-col>

      <br />
      <b-col sm="12">
        <p class="d-inline">к Положению о порядке </p>
      </b-col>
      <b-col sm="12">
        <p class="d-inline">представления отчетности </p>
      </b-col>
      <b-col sm="12">
        <p class="d-inline">(информации) и раскрытии </p>
      </b-col>
      <b-col sm="12">
        <p class="d-inline">информации субъектами </p>
      </b-col>
      <b-col sm="12">
        <p class="d-inline">финансового рынка</p>
      </b-col>
    </div>
    <b-col sm="12" class="d-print-none" v-show="EditReport">
      <h4>Выберите квартал и год:</h4>
      <b-form-select v-model="kvartal" class="mb-3 col-3 d-inline">
        <b-form-select-option value="1 квартал">Квартал 1</b-form-select-option>
        <b-form-select-option value="2 квартал">Квартал 2</b-form-select-option>
        <b-form-select-option value="3 квартал">Квартал 3</b-form-select-option>
        <b-form-select-option value="4 квартал">Квартал 4</b-form-select-option>
      </b-form-select>
      <b-form-select v-model="year" class="mb-3 offset-1 col-3 d-inline">
        <b-form-select-option value="2010">2010</b-form-select-option>
        <b-form-select-option value="2011">2011</b-form-select-option>
        <b-form-select-option value="2012">2012</b-form-select-option>
        <b-form-select-option value="2013">2013</b-form-select-option>
        <b-form-select-option value="2014">2014</b-form-select-option>
        <b-form-select-option value="2015">2015</b-form-select-option>
        <b-form-select-option value="2016">2016</b-form-select-option>
        <b-form-select-option value="2017">2017</b-form-select-option>
        <b-form-select-option value="2018">2018</b-form-select-option>
        <b-form-select-option value="2019">2019</b-form-select-option>
        <b-form-select-option value="2020">2020</b-form-select-option>
      </b-form-select>
    </b-col>

    <h4>1. Сведения о секретаре общества</h4>

    <b-table-simple hover bordered small stacked>
      <b-thead>
        <tr>
          <th rowspan="2">ФИО секретаря общества</th>
          <th colspan="2">Занимаемые должности в настоящее время</th>
          <th rowspan="2">Количество принадлежащих ему ценных бумаг</th>
          <th rowspan="2">Доля в уставном капитале регулируемого субъекта финансового рынка (в %)</th>
          <th rowspan="2">Контактная информация (тел.)</th>
        </tr>
        <tr>
          <th>в органах управления</th>
          <th>вне органов управления</th>
        </tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td v-for="(item, index) in table_1_items" :key="index">
            <b-input type="text" name="inputs" v-model="table_1_items[index]"></b-input>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <h4>2. Информация о существенных фактах (далее - факт), затрагивающих деятельность публичных компаний в отчетном периоде</h4>

    <!-- table_2 -->
    <b-table-simple bordered hover head-variant="light">
      <b-thead>
        <b-tr>
          <b-th v-for="(item, index) in table_2_fields" :key="index">{{item}}</b-th>
        </b-tr>
      </b-thead>
      <tbody>
        <b-tr>
          <b-td v-for="(item, index) in table_2_items" :key="index">
              <b-input type="text" name="inputs" v-model="table_2_items[index]"></b-input>
          </b-td>
        </b-tr>
      </tbody>
    </b-table-simple>
    <h4>3. Информация обо всех выпусках ценных бумаг публичных компаний</h4>
    <!-- table_3 -->
    <b-table-simple bordered hover head-variant="light">
      <b-thead>
        <b-tr>
          <b-th v-for="(item, index) in table_3_fields" :key="index">{{item}}</b-th>
        </b-tr>
      </b-thead>
      <tbody>
        <b-tr>
          <b-td v-for="(item, index) in table_3_items" :key="index">
              <b-input type="text" name="inputs" v-model="table_3_items[index]"></b-input>
          </b-td>
        </b-tr>
      </tbody>
    </b-table-simple>
    <h4>4. Информация об условиях и характере совершенной акционерным обществом сделки с заинтересованными лицами:</h4>
    <ul>
      <li>дата совершения сделки;</li>
      <li>информация о влиянии сделки на деятельность эмитента (финансовый результат, дополнительные инвестиции и т.д.);</li>
      <li>информация об условиях и характере заключенной сделки (предмет, условия, цена сделки и т.д.);</li>
      <li>степень имеющейся заинтересованности (лица, заинтересованные в сделке);</li>
      <li>дата опубликования информации о сделке в средствах массовой информации (прилагается копия опубликованного сообщения);</li>
      <li>дата раскрытия информации о сделке в уполномоченный орган, регулирующий рынок ценных бумаг.</li>
    </ul>

    <p>2) К отчету прилагаются все протоколы общих собраний владельцев ценных бумаг/участников в отчетном году и отчеты счетной комиссии этих собраний, а также копия публикации о созыве общего собрания, если они ранее не были представлены в уполномоченный государственный орган.</p>

    <Supervisor />

    <b-button @click="save">Сохранить</b-button>
  </div>
</template>

<script>
import Queries from '../services/report.service'; // axios запросы на бэк энд

export default {
  name: 'Anex_1',
  created() {
    this.setinfo();
  },
  components: {
    Supervisor: () => import('../components/Supervisor.vue')
  },
  computed: {
    EditReport() {
      if (
        this.status == 2 ||
        this.status == 3 ||
        localStorage.getItem('role') == 'admin'
      ) {
        return false;
      }
      
      return true;
    }
  },
  data() {
    return {
      status: null,
      arr: [],
      kvartal: '',
      year: '',
      table_1_items: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        title6: ''
      },
      table_2_fields: {
        title1: 'Наименование факта',
        title2: 'Дата появления факта',
        title3: 'Влияние факта на деятельность публичной компании',
        title4: 'Дата и форма раскрытия информации о факте'
      },
      table_2_items: {
        title1: '',
        title2: '',
        title3: '',
        title4: ''
      },
      table_3_fields: {
        title1: 'Вид ценной бумаги',
        title2: 'Общая сумма, на которую выпущен данный вид ценной бумаги',
        title3: 'Общее количество выпущенных ценных бумаг',
        title4: 'Дата выпуска ценных бумаг',
        title5: 'Дата размещения',
        title6: 'Дата погашения ценных бумаг',
        title7:
          'Профессиональные участники рынка ценных бумаг, оказывающие услуги в размещении выпусков данных ценных бумаг (номер лицензии юридический адрес)',
        title8: 'Количество владельцев ценных бумаг на конец отчетного периода'
      },
      table_3_items: {
        title1: '',
        title2: '',
        title3: '',
        title4: '',
        title5: '',
        title6: '',
        title7: '',
        title8: ''
      }
    };
  },

  methods: {
    setinfo() {
      return Queries.getReportById(this.$route.params.idreport)
        .then(response => {
            this.table_1_items = response.data.doc.table1
            this.table_2_items = response.data.doc.table2
            this.table_3_items = response.data.doc.table3
            let titleKvartal = response.data.kvartal.split(';');
            this.year = titleKvartal[0];
            this.kvartal = titleKvartal[1].slice(1);
            this.status = response.data.status;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    save() {
      let table = {
        table1: this.table_1_items,
        table2: this.table_2_items,
        table3: this.table_3_items
      };

      let kvartal = this.year + '; ' + this.kvartal //2020; 2 квартал
      let typedoc = 'anex-2';
      let xmldoc = JSON.stringify(table);
      let sender = this.$store.state.company.info.kod;
      let status = 1;

      this.arr = xmldoc;
      this.$store
        .dispatch('report/insert', { typedoc, xmldoc, sender, status, kvartal })
        .then(response => {
          this.$router.push('/reporting');
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>

.anex-2 {
  position: relative;
}

.anex2-block {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 20;
  top: 0;
}
</style>