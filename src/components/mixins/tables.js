export default {
    data() {
        return {
            selected: 'RKV01',
            options: [
                { text: 'Квартальный отчет', value: 'RKV01' },
                { text: 'Годовой отчет', value: 'RKV02' },
                { text: 'Дивиденды', value: 'radio4', disabled: true },
                { text: 'Собрание', value: 'radio5', disabled: true }
            ],
            info: {
                name: '',
                opforma: '',
                address: '',
                activity: '',
                owners: '',
                workers: ''
            },
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
            ]
        }
    },

    computed: {
        assets_Start: function() { // Итого активы (010+020+030+040)

            let suma = +this.tblbalanceitems[3].Start +
            +this.tblbalanceitems[2].Start +
            +this.tblbalanceitems[1].Start +
            +this.tblbalanceitems[0].Start

            this.tblbalanceitems[4].Start = suma

            return suma
        },
        assets_End: function() { // Итого активы (010+020+030+040)
            let suma = +this.tblbalanceitems[3].End +
            +this.tblbalanceitems[2].End +
            +this.tblbalanceitems[1].End +
            +this.tblbalanceitems[0].End

            this.tblbalanceitems[4].End = suma

            return suma
        },
        liabilities_Start: function() { // Итого обязательства (060+070)
            let suma = +this.tblbalanceitems[6].Start + + this.tblbalanceitems[7].Start

            this.tblbalanceitems[8].End = suma

            return suma
        }, 
        liabilities_End: function() { // Итого обязательства (060+070)
            let suma = +this.tblbalanceitems[6].End + + this.tblbalanceitems[7].End

            this.tblbalanceitems[8].End = suma

            return suma
        },
        totaltblbalance_Start: function() { //Итого обязательства и собственный капитал (060+070+090)
            let suma = +this.tblbalanceitems[6].Start + + this.tblbalanceitems[7].Start + + this.tblbalanceitems[9].Start

            this.tblbalanceitems[14].End = suma

            return suma
        },
        totaltblbalance_End: function() { // Итого обязательства и собственный капитал (060+070+090)
            let suma = +this.tblbalanceitems[6].End + + this.tblbalanceitems[7].End + + this.tblbalanceitems[9].End

            this.tblbalanceitems[14].End = suma

            return suma
        },

        operatingActivities_Start: function() { // Прибыль/убыток от операционной деятельности (010+020-030)
            let suma = +this.tblprofititems[0].Start + + this.tblprofititems[1].Start + - this.tblprofititems[2].Start

            this.tblprofititems[3].Start = suma

            return suma
        },
        operatingActivities_End: function() { // Прибыль/убыток от операционной деятельности (010+020-030)
            let suma = +this.tblprofititems[0].End + + this.tblprofititems[1].End + - this.tblprofititems[2].End

            this.tblprofititems[3].End = suma

            return suma
        },
        beforeTax_Start: function () { // Прибыль (убыток) до вычета налогов (040+050)
            let suma = +this.tblprofititems[3].Start + + this.tblprofititems[4].Start

            this.tblprofititems[5].Start = suma

            return suma
        },
        beforeTax_End: function () { // Прибыль (убыток) до вычета налогов (040+050)
            let suma = +this.tblprofititems[3].End + + this.tblprofititems[4].End

            this.tblprofititems[5].End = suma

            return suma
        },
        activities_Start: function () { // Прибыль (убыток) от обычной деятельности (060-070)
            let suma = +this.tblprofititems[5].Start + + this.tblprofititems[6].Start

            this.tblprofititems[7].Start = suma

            return suma
        },
        activities_End: function () { // Прибыль (убыток) от обычной деятельности (060-070)
            let suma = +this.tblprofititems[5].End + + this.tblprofititems[6].End

            this.tblprofititems[7].End = suma

            return suma
        },
        netprofit_Start: function () { // Чистая прибыль (убыток) отчетного периода (080+090)
            let suma = +this.tblprofititems[7].Start + + this.tblprofititems[8].Start

            this.tblprofititems[9].Start = suma

            return suma
        },
        netprofit_End: function () { // Чистая прибыль (убыток) отчетного периода (080+090)
            let suma = +this.tblprofititems[7].End + + this.tblprofititems[8].End

            this.tblprofititems[9].End = suma

            return suma
        }
    },

    methods: {
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
        }
    }
}



