class Forms {
    form1() {
        return {
            head: {
                title1: { text: 'Полное наименование акционера/участника', rowspan: 2 },
                title2: { text: 'Местонахождение акционера/участника', rowspan: 2 },
                title3: { text: 'Телефон, факс, e-mail', rowspan: 2 },
                title4: { text: 'ФИО руководителя исполнительного органа акционера/участника', rowspan: 2 },
                title5: {
                    text: 'ФИО руководителя исполнительного органа акционера/участника',
                    colspan: 3
                },
                title6: { text: 'Вид деятельности', rowspan: 2 },
                title7: { text: 'Дата вступления в акционеры/Участники торгов фондовой биржи', rowspan: 2 },
                title8: { text: 'Статус', rowspan: 2 },
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

    form2() {
        return {
            head: {
                title1: {text: 'Наименование эмитента', rowspan: 2},
                title2: {text: 'Категория (уровень) листинга',rowspan: 2},
                title3: {text: 'Вид ценной бумаги', rowspan: 2},
                title4: {text: 'Номер государственной регистрации ценной бумаги', rowspan: 2},
                title5: {text: 'Дата государственной регистрации ценной бумаги', rowspan: 2},
                title6: {text: 'Наименование органа, осуществившего государственную регистрацию',rowspan: 2},
                title7: {text: 'Дата включения в листинг фондовой биржи',rowspan: 2},
                title8: {text: 'Сокращенное наименование/код ценной бумаги', rowspan: 2},
                title9: {text: 'Номинал ценной бумаги', rowspan: 2}
            },
            body: {
                count: 10
            }
        }
    }
}


export default new Forms();