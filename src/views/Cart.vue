<template>
  <div>
    <!-- Карзина -->
    <b-table
      bordered
      hover
      head-variant="light"
      :items="result"
      :fields="reportList"
    >
      <template #cell(status)="row">
        <span v-if="row.item.status == 0">Редактирование</span>
        <span v-else-if="row.item.status == 1">Готов к отправке</span>
        <span v-else-if="row.item.status == 2">Отправлен</span>
        <span v-else-if="row.item.status == 3">Принят</span>
        <span v-else-if="row.item.status == 4">Отклонен</span>
      </template>
      <template #cell(typedoc)="row">
        <template v-if="row.item.title">
          <!-- Номер(Разделитель) квартала  -->
          <h5>{{ row.item.title }}</h5>
        </template>
        <template v-else>
          <router-link
            :to="`/anex-1/${row.item.id}`"
            v-if="row.item.typedoc == 'anex-1'"
            class="nav-link"
            >Приложение 1</router-link
          >
          <router-link
            :to="`/anex-2/${row.item.id}`"
            v-else-if="row.item.typedoc == 'anex-2'"
            class="nav-link"
            >Приложение 2</router-link
          >
          <router-link
            v-else-if="row.item.typedoc == 'fin'"
            class="nav-link"
            :to="`fin/${row.item.id}/anex1/${row.item.doc.anex1}`"
            >Отчет</router-link
          >
          <router-link
            v-else
            :to="`/report/${row.item.id}?type=${row.item.typedoc}`"
            class="nav-link"
          >
            <span v-if="row.item.typedoc == 'RKV01'">
              Квартальный отчет
              <br />(Приложение 2-1)
            </span>
            <span v-else-if="row.item.typedoc == 'RKV02'">
              Годовой отчет
              <br />(Приложение 2-1)
            </span>
            <span v-else-if="row.item.typedoc == 'fin'">
              Отчет для фондовой биржи
            </span>
            <span v-else-if="row.item.typedoc[0] == 'fact1'">
              Существенный факт
              <br />
              ( {{ factNames[row.item.typedoc] }} )
            </span>
          </router-link>
        </template>
      </template>

      <template #cell(id)="row">
        <p>
          <b-button variant="outline-primary" @click="recoverDoc(row.item.id)"
            >Восстановить</b-button
          >
        </p>

        <p>
          <b-button
            variant="outline-primary"
            @click="deletingForever(row.item.id)"
            >Удалить навсегда</b-button
          >
        </p>
      </template>
    </b-table>
  </div>
</template>
<script>//Скрипт Карзины
import { mapState } from 'vuex';
import axios from 'axios';
import Queries from '../services/report.service';
export default {
  name: 'Profile',
  created() {
    this.setinfo();
  },

  data() {
    return {
      info: [],
      companyname: '', // Модальное окно квитанции
      result: [],
      reportList: [
        {
          key: 'name',
          headerTitle: '№',
          label: 'Наименование компании',
        },
        // {
        //   key: 'id',
        //   headerTitle: 'Название компании',
        //   label: 'Название компании'
        // },
        {
          key: 'status',
          headerTitle: 'Статус документа',
          label: 'Статус документа',
        },
        {
          key: 'createdate',
          headerTitle: 'Дата регистрации',
          label: 'Дата регистрации',
        },
        {
          key: 'typedoc',
          headerTitle: 'Тип документа',
          label: 'Тип документа',
        },
        { key: 'id', headerTitle: 'Подтвердить', label: '' },
      ],
    };
  },
  methods: {
    setinfo() {
      this.result = [];
      // Вывод отправленных файлов из БД
      return Queries.selectDelReports()
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            let res = {
              name:
                response.data[i].doc[0] || response.data[i].doc.reportHead.name,
              status: response.data[i].status,
              createdate: this.getDate(response.data[i].createdate),
              typedoc: response.data[i].typedoc,
              id: response.data[i].id,
            };
            this.result.push(res);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getDate(date) {
      if (date != undefined) {
        var options = {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        };

        let newDate = new Date(date);
        return newDate.toLocaleString('ru', options);
      }
    },

    deletingForever(id) {
      let isBoss = confirm('Вы действительно хотите удалить отчет навсегда?');
      if (isBoss == true) {
        return Queries.deleting(id)
          .then((response) => {
            this.setinfo();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    recoverDoc(id) {//востонавление удаленного отчета
      let isBoss = confirm('Вы действительно хотите восстановить отчет?');
      if (isBoss == true) {
        return Queries.recoverDoc(id)
          .then((response) => {
            this.setinfo();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style>
input[type='file'] {
  position: absolute;
  top: -500px;
}
table,
th,
td {
  border: 1px solid #eee;
  border-collapse: collapse;
  margin-top: 15px;
  margin-bottom: 15px;
}
th,
td {
  padding: 5px;
  text-align: left;
}
.button {
  text-align: center;
}
.box {
  padding: 5px;
}
</style>