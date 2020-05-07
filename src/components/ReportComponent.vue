<template>
  <div class="reportcomponent">
    <h2>
      Данные, включаемые в краткий годовой и ежеквартальный отчет
      для публикации в средствах массовой информации
    </h2>
    <h3>
      Выберите вид
      <b-badge>ОТЧЕТА</b-badge>
    </h3>
    <br />
    <template v-if="!EditReport">
      <div class="active"></div>
    </template>
    <b-form-group>
      <b-form-radio-group
        id="btn-radios-2"
        v-model="selected"
        :options="options"
        buttons
        button-variant="outline-primary"
        size="lg"
        name="radio-btn-outline"
      ></b-form-radio-group>
    </b-form-group>

    <h4>1. Данные об эмитенте:</h4>
    <b-input-group prepend="полное и сокращенное наименование эмитента" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input readonly v-model="info.name"></b-form-input>
    </b-input-group>
    <b-input-group prepend="организационно-правовая форма" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input readonly v-model="info.opforma"></b-form-input>
    </b-input-group>
    <b-input-group
      prepend="юридический и почтовый адрес эмитента, номер телефона и факса"
      class="mt-3"
    >
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input readonly v-model="info.address"></b-form-input>
    </b-input-group>
    <b-input-group prepend="основной вид деятельности эмитента" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input readonly v-model="info.activity"></b-form-input>
    </b-input-group>

    <h4>2. Количество владельцев ценных бумах и работников эмитента.</h4>
    <b-row>
      <b-col cols="8">
        <b-input-group prepend="Количество владельцев" class="mt-3">
          <template v-slot:append>
            <b-input-group-text>
              <strong class="text-danger">!</strong>
            </b-input-group-text>
          </template>
          <b-form-input @blur="sendData" required v-model="info.owners"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Количество работников" class="mt-3">
          <template v-slot:append>
            <b-input-group-text>
              <strong class="text-danger">!</strong>
            </b-input-group-text>
          </template>
          <b-form-input @blur="sendData" v-model="info.workers"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <h4>3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала.</h4>

    <table class="table table-bordered mt-4">
      <thead class="thead-light">
        <tr>
          <th width="5%">#</th>
          <th width="10%">Наименование юридического лица</th>
          <th width="10%">Организационно-правовая форма</th>
          <th
            width="10%"
          >Местонахождение, почтовый адрес,телефон,факс,адрес электронной почты и код ОКПО</th>
          <th width="10%">Доля участия в уставном капитале</th>
          <th width="15%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ item.code }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" @blur="sendData" v-model="item.code" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" @blur="sendData" v-model="item.name" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.description }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                @blur="sendData"
                v-model="item.description"
              />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.qty }}</span>
            <span v-if="editIndex === index">
              <input
                class="form-control form-control-sm"
                @blur="sendData"
                type="number"
                v-model.number="item.qty"
              />
            </span>
          </td>

          <td>
            <span v-if="editIndex !== index">
              <button
                @click="edit(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >Изменить</button>
              <button
                @click="remove(item, index)"
                class="btn btn-sm btn-outline-secondary mr-2"
              >Удалить</button>
            </span>
            <span v-else>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="cancel(item)">Отменить</button>
              <button class="btn btn-sm btn-outline-secondary mr-2" @click="save(item)">Сохранить</button>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-3 offset-9 text-right my-3">
      <button v-show="!editIndex" @click="add" class="btn btn-sm btn-secondary">Добавить</button>
    </div>
    <h4>4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде.</h4>

    <b-table bordered :items="tblfactitems" :fields="tblfactfields" head-variant="light">
      <template #cell(Name)="row">
        <input type="text" @blur="sendData" v-model="row.item.Name" />
      </template>
      <template #cell(DateCreate)="row">
        <b-datepicker today-button v-model="row.item.DateCreate"></b-datepicker>
      </template>
      <template #cell(Influence)="row">
        <input type="text" @blur="sendData" v-model="row.item.Influence" />
      </template>
      <template #cell(DateDisclosure)="row">
        <b-datepicker today-button v-model="row.item.DateDisclosure"></b-datepicker>
      </template>
    </b-table>
    {{tblfactitems}}
    <h4>5. Финансовая отчетность эмитента за отчетный квартал</h4>

    <p>1) Сведения, включаемые в бухгалтерский баланс</p>

    <b-table
      bordered
      hover
      :items="tblbalanceitems"
      :fields="tblbalancefields"
      head-variant="light"
    >
      <template #cell(Start)="row">
        <span>
          <template v-if="row.item.Code==='050'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="assets_Start" />
          </template>
          <template v-else-if="row.item.Code === '080'">
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              readonly
              v-model="liabilities_Start"
            />
          </template>
          <template v-else-if="row.item.Code === '100'">
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              readonly
              v-model="totaltblbalance_Start"
            />
          </template>
          <template v-else>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              @blur="sendData"
              v-model="row.item.Start"
            />
          </template>
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <template v-if="row.item.Code==='050'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="assets_End" />
          </template>
          <template v-else-if="row.item.Code === '080'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="liabilities_End" />
          </template>
          <template v-else-if="row.item.Code === '100'">
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              readonly
              v-model="totaltblbalance_End"
            />
          </template>
          <template v-else>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              @blur="sendData"
              v-model="row.item.End"
            />
          </template>
        </span>
      </template>
    </b-table>

    <p>2) Сведения, включаемые в отчет о прибылях и убытках</p>

    <b-table bordered hover :items="tblprofititems" :fields="tblprofitfields" head-variant="light">
      <template #cell(Start)="row">
        <span>
          <template v-if="row.item.Code==='040'">
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              readonly
              v-model="operatingActivities_Start"
            />
          </template>
          <template v-else-if="row.item.Code==='060'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="beforeTax_Start" />
          </template>
          <template v-else-if="row.item.Code==='080'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="activities_Start" />
          </template>
          <template v-else-if="row.item.Code==='100'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="netprofit_Start" />
          </template>
          <template v-else>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              @blur="sendData"
              v-model="row.item.Start"
            />
          </template>
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <template v-if="row.item.Code==='040'">
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              readonly
              v-model="operatingActivities_End"
            />
          </template>
          <template v-else-if="row.item.Code==='060'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="beforeTax_End" />
          </template>
          <template v-else-if="row.item.Code==='080'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="activities_End" />
          </template>
          <template v-else-if="row.item.Code==='100'">
            <input type="number" step="0.01" placeholder="0,00" readonly v-model="netprofit_End" />
          </template>
          <template v-else>
            <input
              type="number"
              step="0.01"
              placeholder="0,00"
              @blur="sendData"
              v-model="row.item.End"
            />
          </template>
        </span>
      </template>
    </b-table>

    <p>3) Сведения, включаемые в отчет об изменениях в капитале</p>

    <b-table
      bordered
      hover
      :items="tblcapitalitems"
      :fields="tblcapitalfields"
      head-variant="light"
    >
      <template #cell(TItle)="row">
        <template v-if="row.item.Code==='100' || row.item.Code==='010'">
          <label>Сальдо на</label>
          <b-datepicker today-button v-model="row.item.TItle"></b-datepicker>
        </template>
        <template v-else>
          <span>{{row.item.TItle}}</span>
        </template>
      </template>
      <template #cell(Start)="row">
        <span>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            @blur="sendData"
            v-model="row.item.Start"
          />
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <input
            type="number"
            step="0.01"
            placeholder="0,00"
            @blur="sendData"
            v-model="row.item.End"
          />
        </span>
      </template>
    </b-table>

    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea-rows"
          placeholder="6. Сведения о направлении средств, привлеченных эмитентом в результате размещения эмиссионных ценных бумаг, которые
    включают в себя: общий объем привлеченных средств, сведения о привлеченных средствах, использованных по каждому из
    направлений, и о направлениях использования привлеченных средств."
          rows="8"
          v-model="textareas.placement"
          @blur="sendData"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea-rows"
          placeholder="7. Заемные средства, полученные эмитентом и его дочерними обществами в отчетном квартале. Данный пункт отражает заемные
    средства, полученные эмитентом в отчетном квартале, и заемные средства, полученные дочерними обществами в отчетном квартале."
          rows="8"
          v-model="textareas.funds"
          @blur="sendData"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea-rows"
          placeholder="8. Сведения о долгосрочных и краткосрочных финансовых вложениях эмитента за отчетный квартал."
          rows="8"
          v-model="textareas.investment"
          @blur="sendData"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea-rows"
          placeholder="9. Доходы по ценным бумагам эмитента. Эта информация представляется при начислении доходов по ценным бумагам 
      эмитента в отчетном квартале или в квартале, предшествующем отчетному кварталу, и включает: вид ценной бумаги, размер доходов,
      начисленных на одну ценную бумагу,и общую сумму доходов, начисленных по ценным бумагам данного вида."
          rows="8"
          v-model="textareas.income"
          @blur="sendData"
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12">
        <b-form-textarea
          id="textarea-rows"
          placeholder="10. Информация об условиях и характере сделки, совершенной лицами, заинтересованными в совершении обществом сделки,
        включает: дату совершения сделки, информацию о влиянии сделки на деятельность эмитента (финансовый результат, дополнительные
        инвестиции и т.д.), информацию об условиях и характере заключенной сделки (предмет, условия, цена сделки и т.д.),
        степень имеющейся заинтересованности (лица, заинтересованного в сделке), дату опубликования информации о сделке в
        средствах массовой информации (прилагается копия опубликованного сообщения), а также дату направления уведомления с
        информацией о сделке в уполномоченный орган по регулированию рынка ценных бумаг."
          rows="8"
          v-model="textareas.deal"
        ></b-form-textarea>
      </b-col>
    </b-row>
    {{setinfo}}
  </div>
</template>


<script>
import Queries from '../services/report.service'; // axios запросы на бэк энд
import tables from '../mixins/tables.js';
export default {
  name: 'ReportComponent',
  mixins: [tables],
  created() {
    this.getInfoCompany();
  },
  data() {
    return {
      result: [],
      status: null,
      props: ['input']
    };
  },
  methods: {
    getInfoCompany() {
      return Queries.getInfoCompanyById()
        .then(response => {
          this.info = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    sendData() {
      this.$emit('input', {
        typedoc: this.selected,
        reportHead: this.info,
        tblOwners: this.items,
        tblfact: this.tblfactitems,
        tblBalance: this.tblbalanceitems,
        tblProfit: this.tblprofititems,
        tblCapital: this.tblcapitalitems,
        reportFooter: this.textareas,
        test: this.testInp

      });
    },
    TransformNumber(e) {
      console.log(e);
      // if (e.value.indexOf(".") != '-1') {
      //   e.value=e.value.substring(0, e.value.indexOf(".") + 3);
      // }
    }
  },
  computed: {
    EditReport() {
      if (this.status == 1 || this.status == 4 || this.status == null) {
        return true;
      }
      return false;
    },
    setinfo() {
      return Queries.getReportById(this.$route.params.id)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          this.tblfactitems = response.data.doc.tblfact;
          this.result = response.data.doc;
          this.info = response.data.doc.reportHead;
          this.items = response.data.doc.tblOwners;
          this.tblbalanceitems = response.data.doc.tblBalance;
          this.tblprofititems = response.data.doc.tblProfit;
          this.tblcapitalitems = response.data.doc.tblCapital;
          this.textareas = response.data.doc.reportFooter;
          this.status = response.data.status;
          
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
textarea {
  margin: 10px 0;
}
table input {
  text-align: center;
}
table {
  text-align: center;
}
.active {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
}
</style>