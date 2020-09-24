export default {
    data() {
        return {
                tblforma3BD1fields: 
                     [
                        { 
                            key: 'title1',
                            headerTitle: 'С ведения о дебиторской и кредиторской задолженности №', 
                            label: 'С ведения о дебиторской и кредиторской задолженности №' 
                        },
                        { 
                            key: 'title2',
                            headerTitle: 'Наименование показателя', 
                            label: 'Наименование показателя' 
                        },
                        {
                            key: 'title3',
                            headerTitle: 'До 1 месяца',
                            label: 'До 1 месяца'
                        },
                        {
                            key: 'title4',
                            headerTitle: '1-3 месяца',
                            label: '1-3 месяца'
                        },      
                        {
                            key: 'title5',
                            headerTitle: '3-6 месяцев',
                            label: '3-6 месяцев'
                        },
                        {
                            key: 'title6',
                            headerTitle: '6-12 месяцев',
                            label: '6-12 месяцев'
                        },
                        {
                            key: 'title7',
                            headerTitle: 'Свыше 12 месяцев',
                            label: 'Свыше 12 месяцев'
                        },
                        {
                            key: 'title8',
                            headerTitle: 'Итого',
                            label: 'Итого'
                        }
                    ],
                    tblforma3BD1items: [
                        {title1: '',title2: '',title3: '',title4: '',title5: '',title6: '',title7: '',title8: ''}
                    ],

                    form4BD2:{
                        head: {
                            title1:{text:'№', rowspan:2},
                            title2:{text:'Наименование актива', rowspan:2},
                            title3:{text:'Финансовые вложения на балансе на конец отчетного периода', colspan:3},
                            title4:{text:'Оценка финансовых вложений по рыночной цене', colspan:2},
                        },
                        head2:{
                            title1: 'Количество ценных бумаг (в ед.)',
                            title2: 'Балансовая стоимость пакета',
                            title3: 'Балансовая стоимость пакета в процентах к итогу'
                        },
                        head3:{
                            title1: 'Рыночная цена одной ценной бумаги (сом.)',
                            title2: 'Рыночная цена пакета (сом.)',
                        },
                        body:{
                            count: 5
                        }
                    },

                    form5BD3:{
                        head:{
                            title1:{text:'№', rowspan:2},
                            title2:{text:'Наименование показателей', rowspan:2},
                            title3:{text:'Сделки по покупке', colspan:3},
                            title4:{text:'Сделки по продаже', colspan:3},
                        },
                        head2:{
                            title1: 'Количество сделок (в ед.)',
                            title2: 'Количество ценных бумаг (шт.)',
                            title3: 'Объем сделок'
                        },
                        head3:{
                            title1: 'Количество сделок (в ед.)',
                            title2: 'Количество ценных бумаг (шт.)',
                            title3: 'Объем сделок'
                        },
                        body:{
                            count: 6
                        }
                    },

                    form6B1:{
                        head:{
                            title1:{text:'№строки', rowspan:2},
                            title2:{text:'Наименование показателей', rowspan:2},
                            title3:{text:'Количество (в ед.)', rowspan:2},
                        },
                        body:{
                            count:1
                        }
                    },

                    form7DU1:{
                        head:{
                            title1:{text:'№строки', rowspan:2},
                            title2:{text:'Наименование показателей', rowspan:2},
                            title3:{text:'Количество (в ед.)', rowspan:2},
                        },
                        body:{
                            count:1
                        }
                    },

                    form12PD4:{
                        head:{
                            title1:{text:'№строки', rowspan:2},
                            title2:{text:'Наименование показателей', rowspan:2},
                            title3:{text:'Значение показателя', rowspan:2},
                        },
                        body:{
                            count:1
                        }
                    },

                    form13PD5:{
                        head:{
                            title1:{text:''},
                            title2:{text:''},
                            title3:{text:''},
                        },
                        body:{
                            count:1
                        }
                    },
        }
    }
}