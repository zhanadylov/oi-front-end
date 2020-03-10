<template>
  <div class="reportcomponent">
    <h3>
      Выберите вид
      <b-badge>ОТЧЕТА</b-badge>
    </h3>
    <br />
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

    <h4>Данные об эмитенте</h4>
    <b-input-group prepend="полное и сокращенное наименование эмитента" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input v-model="info.name"></b-form-input>
    </b-input-group>
    <b-input-group prepend="организационно-правовая форма" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input v-model="info.opforma"></b-form-input>
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
      <b-form-input v-model="info.address"></b-form-input>
    </b-input-group>
    <b-input-group prepend="основной вид деятельности эмитента" class="mt-3">
      <template v-slot:append>
        <b-input-group-text>
          <strong class="text-danger">!</strong>
        </b-input-group-text>
      </template>
      <b-form-input v-model="info.activity"></b-form-input>
    </b-input-group>

    <h4>
      Количество владельцев ценных бумах и работников эмитента. (Данный пункт включает в себя сведения о количестве владельцев
      ценных бумаг по состоянию на конец отчетного квартала и кличестве работников эмитента на конец отчетного квартала.)
    </h4>
    <b-row>
      <b-col cols="8">
        <b-input-group prepend="Количество владельцев" class="mt-3">
          <template v-slot:append>
            <b-input-group-text>
              <strong class="text-danger">!</strong>
            </b-input-group-text>
          </template>
          <b-form-input v-model="info.owners"></b-form-input>
        </b-input-group>
        <b-input-group prepend="Количество работников" class="mt-3">
          <template v-slot:append>
            <b-input-group-text>
              <strong class="text-danger">!</strong>
            </b-input-group-text>
          </template>
          <b-form-input v-model="info.workers"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>

    <h4>
      3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала.
      (В данном пункте отражается полное наименование юридического лица, его организационно-правовая форма, местонахождение,
      почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО, а также доля участия в уставном капитале).
    </h4>

    <table class="table table-bordered mt-4">
      <thead class="thead-light">
        <tr>
          <th width="5%">#</th>
          <th width="10%">Наименование</th>
          <th width="10%">Форма собственности</th>
          <th width="10%">Адрес</th>
          <th width="10%">Проценты</th>
          <th width="15%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <span v-if="editIndex !== index">{{ item.code }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.code" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.name }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.name" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.description }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" v-model="item.description" />
            </span>
          </td>
          <td>
            <span v-if="editIndex !== index">{{ item.qty }}</span>
            <span v-if="editIndex === index">
              <input class="form-control form-control-sm" type="number" v-model.number="item.qty" />
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
    <h4>
      4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде.
      (Данный пункт включает в себя сведения о наименовании факта, дате его появления, влиянии факта на деятельность эмитента,
      а также дату и форму раскрытия информации о данном факте).
    </h4>

    <h4>Финансовая отчетность эмитента за отчетный квартал</h4>

    <p>1) Сведения, включаемые в бухгалтерский баланс</p>

    <b-table
      :fields="tblbalancefields"
      bordered
      hover
      :items="tblbalanceitems"
      head-variant="light"
    >
      <template #cell(Start)="row">
        <span>
          <input type="number" v-model="row.item.Start" />
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <input type="number" v-model="row.item.End" />
        </span>
      </template>
    </b-table>

    <p>2) Сведения, включаемые в отчет о прибылях и убытках</p>

    <b-table :fields="tblprofitfields" bordered hover :items="tblprofititems" head-variant="light">
      <template #cell(Start)="row">
        <span>
          <input type="number" v-model="row.item.Start" />
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <input type="number" v-model="row.item.End" />
        </span>
      </template>
    </b-table>

    <p>3) Сведения, включаемые в отчет об изменениях в капитале</p>

    <b-table
      :fields="tblcapitalfields"
      bordered
      hover
      :items="tblcapitalitems"
      head-variant="light"
    >
      <template #cell(Start)="row">
        <span>
          <input type="number" v-model="row.item.Start" />
        </span>
      </template>
      <template #cell(End)="row">
        <span>
          <input type="number" v-model="row.item.End" />
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
    {{result}}
  </div>
</template>

<script>
import Queries from '../services/report.service'; // axios запросы на бэк энд
export default {
  name: 'ReportComponent',
  created() {
    this.getInfoCompany(),
    this.setinfo()
  },
  data() {
    return {
      info: {
        name: '',
        opforma: '',
        address: '',
        activity: '',
        owners: '',
        workers: ''
      },
      selected: 'RKVT',
      options: [
        { text: 'Квартальный отчет', value: 'RKV01' },
        { text: 'Годовой отчет', value: 'RKV02' },
        { text: 'Квитанция', value: 'KVIT01', disabled: true },
        { text: 'Дивиденды', value: 'radio4', disabled: true },
        { text: 'Собрание', value: 'radio5', disabled: true }
      ],
      editIndex: null,
      originalData: null,
      items: [{ code: '0', name: '0', description: '0', qty: '0' }],
      tax: 10,
      tblbalancefields: [
        { key: 'Code', headerTitle: 'Код строк', label: 'Код строк' },
        { key: 'TItle', headerTitle: ' ', label: ' ' },
        {
          key: 'Start',
          headerTitle: 'Начало отчетного периода, тыс.сом',
          label: 'Начало отчетного периода, тыс.сом'
        },
        {
          key: 'End',
          headerTitle: 'На конец отчетного периода, тыс сом',
          label: 'На конец отчетного периода, тыс сом'
        }
      ],
      tblbalanceitems: [
        { Code: '010', TItle: '1. Оборотные активы', Start: 0, End: 0 },
        { Code: '020', TItle: '2. Внеоборотные активы', Start: 0, End: 0 },
        {
          Code: '030',
          TItle: '3. Долгосрочная дебиторская задолженность',
          Start: 0,
          End: 0
        },
        {
          Code: '040',
          TItle: '4. Краткосрочная дебиторская задолженность',
          Start: 0,
          End: 0
        },
        {
          Code: '050',
          TItle: 'Итого активы (010+020+030+040)',
          Start: 0,
          End: 0
        },
        { TItle: 'Обязательства и капитал' },
        {
          Code: '060',
          TItle: '1. Краткосрочные обязательства',
          Start: 0,
          End: 0
        },
        {
          Code: '070',
          TItle: '2. Долгосрочные обязательства',
          Start: 0,
          End: 0
        },
        {
          Code: '080',
          TItle: 'Итого обязательства (060+070)',
          Start: 0,
          End: 0
        },
        { Code: '090', TItle: 'Собственный капитал', Start: 0, End: 0 },
        { TItle: '1. Уставный капитал', Start: 0, End: 0 },
        { TItle: '2. Дополнительный оплаченный капитал', Start: 0, End: 0 },
        { TItle: '3. Нераспределенная прибыль', Start: 0, End: 0 },
        { TItle: '4. Резервный капитал', Start: 0, End: 0 },
        {
          Code: '100',
          TItle: 'Итого обязательства и собственный капитал (060+070+090)',
          Start: 0,
          End: 0
        }
      ],

      tblprofitfields: [
        { key: 'Code', headerTitle: 'Код строк', label: 'Код строк' },
        { key: 'TItle', headerTitle: ' ', label: ' ' },
        {
          key: 'Start',
          headerTitle: 'Начало отчетного периода, тыс.сом',
          label: 'Начало отчетного периода, тыс.сом'
        },
        {
          key: 'End',
          headerTitle: 'На конец отчетного периода, тыс сом',
          label: 'На конец отчетного периода, тыс сом'
        }
      ],
      tblprofititems: [
        { Code: '010', TItle: 'Валовая прибыль', Start: 0, End: 0 },
        {
          Code: '020',
          TItle:
            'Доходы и расходы от прочей операционной деятельности (доходы - расходы)',
          Start: 0,
          End: 0
        },
        { Code: '030', TItle: 'Операционные расходы', Start: 0, End: 0 },
        {
          Code: '040',
          TItle: 'Прибыль/убыток от операционной деятельности (010+020-030)',
          Start: 0,
          End: 0
        },
        {
          Code: '050',
          TItle: 'Доходы и расходы от неоперационной деятельности',
          Start: 0,
          End: 0
        },
        {
          Code: '060',
          TItle: 'Прибыль (убыток) до вычета налогов (040+050)',
          Start: 0,
          End: 0
        },
        {
          Code: '070',
          TItle: 'Расходы по налогу на прибыль',
          Start: 0,
          End: 0
        },
        {
          Code: '080',
          TItle: 'Прибыль (убыток) от обычной деятельности (060-070)',
          Start: 0,
          End: 0
        },
        {
          Code: '090',
          TItle: 'Чрезвычайные статьи за минусом налога на прибыль',
          Start: 0,
          End: 0
        },
        {
          Code: '100',
          TItle: 'Чистая прибыль (убыток) отчетного периода (080+090)',
          Start: 0,
          End: 0
        }
      ],

      tblcapitalfields: [
        { key: 'Code', headerTitle: 'Код строк', label: 'Код строк' },
        { key: 'TItle', headerTitle: ' ', label: ' ' },
        {
          key: 'Start',
          headerTitle: 'Начало отчетного периода, тыс.сом',
          label: 'Начало отчетного периода, тыс.сом'
        },
        {
          key: 'End',
          headerTitle: 'На конец отчетного периода, тыс сом',
          label: 'На конец отчетного периода, тыс сом'
        }
      ],
      tblcapitalitems: [
        { Code: '010', TItle: "Сальдо на '' 2020 г.", Start: 0, End: 0 },
        {
          Code: '020',
          TItle:
            'Изменения в учетной политике и исправление существенных ошибок',
          Start: 0,
          End: 0
        },
        { Code: '030', TItle: 'Пересчитанное сальдо', Start: 0, End: 0 },
        {
          Code: '040',
          TItle:
            'Чистая прибыль или убытки, не признанные в отчете о прибылях и убытках',
          Start: 0,
          End: 0
        },
        {
          Code: '050',
          TItle: 'Чистая прибыль (убытки) за отчетный период',
          Start: 0,
          End: 0
        },
        { Code: '060', TItle: 'Дивиденды', Start: 0, End: 0 },
        { Code: '070', TItle: 'Эмиссия акций', Start: 0, End: 0 },
        {
          Code: '080',
          TItle: 'Ограничение прибыли к распределению',
          Start: 0,
          End: 0
        },
        {
          Code: '090',
          TItle: 'Изменение уставного капитала',
          Start: 0,
          End: 0
        },
        { Code: '100', TItle: "Сальдо на ''  2020 г.", Start: 0, End: 0 }
      ],
      textareas: {
        placement: '',
        funds: '',
        investment: '',
        income: '',
        deal: ''
      },
      result: [],
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
    setinfo() {
      return Queries.getReportById(this.$route.params.id)
        .then(response => {
          //let xmldoc = JSON.parse(response.data.xmldoc)
          this.result = response.data.doc;
          this.info = response.data.doc.reportHead;
          this.items = response.data.doc.tblOwners;
          this.tblbalanceitems = response.data.doc.tblBalance;
          this.tblprofititems = response.data.doc.tblProfit;
          this.tblcapitalitems = response.data.doc.tblCapital;
          this.textareas = response.data.doc.reportFooter;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    add() {
      this.originalData = null;
      this.items.push({ code: '', name: '', description: '', qty: '' });
      this.editIndex = this.items.length - 1;
    },

    edit(item, index) {
      this.originalData = Object.assign({}, item);
      this.editIndex = index;
    },

    cancel(item) {
      this.editIndex = null;

      if (!this.originalData) {
        this.items.splice(this.items.indexOf(item), 1);
        return;
      }

      Object.assign(item, this.originalData);
      this.originalData = null;
    },

    remove(item, index) {
      this.items.splice(index, 1);
    },

    save() {
      this.originalData = null;
      this.editIndex = null;
    },
    sendData() {
      this.$emit('input', {
        typedoc: this.selected,
        reportHead: this.info,
        tblOwners: this.items,
        tblBalance: this.tblbalanceitems,
        tblProfit: this.tblprofititems,
        tblCapital: this.tblcapitalitems,
        reportFooter: this.textareas
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
</style>
