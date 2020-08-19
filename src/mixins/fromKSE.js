export default {
    data() {
        return {
            form1: {
                head: {
                    title1: {text: 'Полное наименование акционера/участника', rowspan: 2},
                    title2: {text: 'Местонахождение акционера/участника',rowspan: 2},
                    title3: {text: 'Телефон, факс, e-mail', rowspan: 2},
                    title4: {text: 'ФИО руководителя исполнительного органа акционера/участника', rowspan: 2},
                    title5: {
                        text: 'ФИО руководителя исполнительного органа акционера/участника',
                        colspan: 3
                    },
                    title6: {text: 'Вид деятельности',rowspan: 2},
                    title7: {text: 'Дата вступления в акционеры/Участники торгов фондовой биржи',rowspan: 2},
                    title8: {text: 'Статус', rowspan: 2},
                },
                head2: {
                    title1: 'Номер лицензии',
                    title2: 'Орган, выдавший лицензию',
                    title3: 'Дата выдачи'
                },
                body: {
                    count: 10
                }
            }
        }
    }
}