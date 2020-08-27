export default {
    data (){
        return {    
            tblEmitentfields: [
                { key: 'TitleFirst', headerTitle: 'Наименование организации', label: 'Наименование организации' },
                { key: 'TitleSecond', headerTitle: 'Сфера деятельности', label: 'Сфера деятельности'},
                { key: 'TitleThird', headerTitle: 'Статус Эмитента в организации', label: 'Статус Эмитента в организации' },
            ],
            tblEmitentitems: [
                {TitleFirst: '', TitleSecond: '', TitleThird: ''}
            ],

            tblDataDohodfields: [
                { key: 'VidCB', headerTitle: 'Вид ЦБ ', label: 'Вид ЦБ ' },
                { key: 'Period', headerTitle: 'Период', label: 'Период'},
                { 
                    key: 'Razmer', 
                    headerTitle: 'Размер дивиденда или годового купонного дохода', 
                    label: 'Размер дивиденда или годового купонного дохода' 
                },
                { 
                    key: 'Svedenie', 
                    headerTitle: 'Сведения о наличии задолженности с указанием ее суммы и причины', 
                    label: 'Сведения о наличии задолженности с указанием ее суммы и причины' 
                },
            ],
            tblDataDohoditems: [
                {VidCB: '', Period: '', Razmer: '', Svedenie: ''}
            ],

            tblEmitentAkciafields: [
                {   
                    key: 'name', 
                    headerTitle: 'Наименование акционера (учредителя)', 
                    label: 'Наименование акционера(учредителя)' 
                },
                { 
                    key: 'name1', 
                    headerTitle: 'Страна резидентства', 
                    label: 'Страна резидентства'
                },
                { 
                    key: 'name2', 
                    headerTitle: 'Доля в капитале Эмитента', 
                    label: 'Доля в капитале Эмитента' 
                },
                { 
                    key: 'name3', 
                    headerTitle: 'Количество акций (долей)', 
                    label: 'Количество акций (долей)' 
                },
            ],
            tblEmitentAkciaitems: [
                {name: '', name1: '', name2: '', name3: ''}
            ],

            tblOwnersfields: [
                {   
                    key: 'title', 
                    headerTitle: 'Наименование владельца', 
                    label: 'Наименование владельца' 
                },
                { 
                    key: 'title1', 
                    headerTitle: 'Вид ценной бумаги (владельцы группируются по ценным бумагам одного вида)', 
                    label: 'Вид ценной бумаги (владельцы группируются по ценным бумагам одного вида)'
                },
                { 
                    key: 'title2', 
                    headerTitle: 'Страна резидентства', 
                    label: 'Страна резидентства'
                },
                { 
                    key: 'title3', 
                    headerTitle: 'Доля владения ', 
                    label: 'Доля владения' 
                },
                {
                    key: 'title4',
                    headerTitle: 'Количество ценных бумаг',
                    label: 'Количество ценных бумаг'
                }
            ],
            tblOwnersitems: [
                {title: '', title1: '', title2: '', title3: '', title4: ''}
            ],

            tblStructuraEmintentfields: [
                {   
                    key: 'Space', 
                    headerTitle: '', 
                    label: '' 
                },
                { 
                    key: 'Kolichestvo', 
                    headerTitle: 'Количество', 
                    label: 'Количество'
                },
                { 
                    key: 'Kapital', 
                    headerTitle: 'Доля в капитале', 
                    label: 'Доля в капитале'
                },
            ],
            tblStructuraEmintentitems: [
                {Space: '', Kolichestvo: '', Kapital: ''}
            ],
            
            tblPersonalSostavfields: [
                {   
                    key: 'FIO', 
                    headerTitle: 'Ф. И. О.', 
                    label: 'Ф. И. О.' 
                },
                { 
                    key: 'Doljnost', 
                    headerTitle: 'Должность в органах управления (должностные лица группируются по органам управления)', 
                    label: 'Должность в органах управления (должностные лица группируются по органам управления)'
                },
                { 
                    key: 'Dolya', 
                    headerTitle: 'Доля в капитале Эмитента', 
                    label: 'Доля в капитале Эмитента'
                },
                { 
                    key: 'KolichestvoAkciy', 
                    headerTitle: 'Количество акций (долей)', 
                    label: 'Количество акций (долей)'
                },
                { 
                    key: 'MestoRaboty', 
                    headerTitle: 'Основное место работы должностного лица Эмитента', 
                    label: 'Основное место работы должностного лица Эмитента'
                },
            ],
            tblPersonalSostavitems: [
                {FIO: '', Doljnost: '', Dolya: '',KolichestvoAkciy: '',MestoRaboty: ''}
            ],

            tblZasedaniyeEmitentfields: [
                {   
                    key: 'DataZasedaniye', 
                    headerTitle: 'Дата проведения заседания', 
                    label: 'Дата проведения заседания' 
                },
                { 
                    key: 'Povestka', 
                    headerTitle: 'Повестка дня', 
                    label: 'Повестка дня'
                },
            ],
            tblZasedaniyeEmitentitems: [
                {DataZasedaniye: '', Povestka: ''}
            ],

            tblAdminSankfields: [
                {   
                    key: 'Sank', 
                    headerTitle: 'На кого наложена санкция', 
                    label: 'На кого наложена санкция' 
                },
                { 
                    key: 'Nalojena', 
                    headerTitle: 'Кем наложена санкция', 
                    label: 'Кем наложена санкция'
                },
                { 
                    key: 'Osnovnoi', 
                    headerTitle: 'Основание санкции и ее размер', 
                    label: 'Основание санкции и ее размер'
                },
                { 
                    key: 'Ispolneniye', 
                    headerTitle: 'Сведения об исполнении', 
                    label: 'Сведения об исполнении'
                },
            ],
            tblAdminSankitems: [
                {Sank: '', Nalojena: '', Osnovnoi: '',Ispolneniye: ''}
            ],

            tblTwoDotNinefields: [
                {   
                    key: 'title', 
                    headerTitle: 'Истец (если должностное лицо Эмитента, то указать должность)', 
                    label: 'Истец (если должностное лицо Эмитента, то указать должность)' 
                },
                { 
                    key: 'title1', 
                    headerTitle: 'Ответчик (если должностное лицо Эмитента, то указать должность)', 
                    label: 'Ответчик (если должностное лицо Эмитента, то указать должность)'
                },
                { 
                    key: 'title2', 
                    headerTitle: 'Предмет разбирательства', 
                    label: 'Предмет разбирательства'
                },
                { 
                    key: 'title3', 
                    headerTitle: 'Сведения об имущественном характере исковых требований', 
                    label: 'Сведения об имущественном характере исковых требований'
                },
            ],
            tblTwoDotNineitems: [
                {title: '', title1: '', title2: '',title3: ''}
            ],

            tblChapterThreefields: [
                {   
                    key: 'name', 
                    headerTitle: 'Наименование кредитора', 
                    label: 'Наименование кредитора' 
                },
                { 
                    key: 'harakter', 
                    headerTitle: 'Характер задолженности', 
                    label: 'Характер задолженности'
                },
                { 
                    key: 'dolya', 
                    headerTitle: 'Доля в общем объеме текущих обязательств', 
                    label: 'Доля в общем объеме текущих обязательств'
                },
            ],
            tblChapterThreeitems: [
                {name: '', harakter: '', dolya: ''}
            ],

            tblThreeDotTwofields:[
                {
                    key: 'title',
                    headerTitle: 'Наименование кредитора',
                    label: 'Наименование кредитора'
                },
                {
                    key: 'title1',
                    headerTitle: 'Характер задолженности (причина возникновения обязательства, а также указание на то, является ли обязательство просроченным или нет)',
                    label: 'Характер задолженности (причина возникновения обязательства, а также указание на то, является ли обязательство просроченным или нет)'
                },
                {
                    key: 'title2',
                    headerTitle: 'Доля в общем объеме текущих обязательств',
                    label: 'Доля в общем объеме текущих обязательств'
                }
            ],
            tblThreeDotTwoitems: [
                {title: '', title1: '', title2: ''}
            ],

            tblDolgosrochniyfields:[
                {
                    key: 'title3',
                    headerTitle: 'Наименование кредитора',
                    label: 'Наименование кредитора'
                },
                {
                    key: 'title4',
                    headerTitle: 'Характер задолженности (причина возникновения обязательства, а также указание на то, является ли обязательство просроченным или нет)',
                    label: 'Характер задолженности (причина возникновения обязательства, а также указание на то, является ли обязательство просроченным или нет)'
                },
                {
                    key: 'title5',
                    headerTitle: 'Доля в общем объеме текущих обязательств',
                    label: 'Доля в общем объеме текущих обязательств'
                }
            ],
            tblDolgosrochniyitems: [
                {title3: '', title4: '', title5: ''}
            ],

            tblSdelkaDatafields:[
                {
                    key: 'data',
                    headerTitle: 'Дата',
                    label: 'Дата'
                },
                {
                    key: 'sdelka',
                    headerTitle: 'Сущность сделки',
                    label: 'Сущность сделки'
                },
                {
                    key: 'razmer',
                    headerTitle: 'Размер сделки',
                    label: 'Размер сделки'
                },
                {
                    key: 'ending',
                    headerTitle: 'Сведения о завершении сделки',
                    label: 'Сведения о завершении сделки'
                }
            ],
            tblSdelkaDataitems: [
                {data: '', sdelka: '', razmer: '', ending: ''}
            ],

            tblNormativfields:[
                {
                    key: 'name',
                    headerTitle: 'Наименование норматива',
                    label: 'Наименование норматива'
                },
                {
                    key: 'razmernor',
                    headerTitle: 'Размер норматива ',
                    label: 'Размер норматива'
                },
                {
                    key: 'znacheniye',
                    headerTitle: 'Значение на начало отчетного квартала',
                    label: 'Значение на начало отчетного квартала'
                },
                {
                    key: 'koneckvartal',
                    headerTitle: 'Значение на конец отчетного квартала',
                    label: 'Значение на конец отчетного квартала'
                }
            ],
            tblNormativitems: [
                {data: '', sdelka: '', razmer: '', ending: ''}
            ],

            tblfilialfields: [
                { key: 'Name', headerTitle: 'Наименование', label: 'Наименование' },
                { key: 'Addres', headerTitle: 'Адрес местонахождения', label: 'Адрес местонахождения'},
                {
                    key: 'Vid',
                    headerTitle: 'Вид деятельности',
                    label: 'Вид деятельности'
                },
                {
                    key: 'FIODirector',
                    headerTitle: 'Ф. И. О. руководителя',
                    label: 'Ф. И. О. руководителя'
                },
                {
                    key: 'RazmerKapital',
                    headerTitle: 'Размер доли в капитале',
                    label: 'Размер доли в капитале'
                }
            ],
            tblfilialitems: [
                {Name: '',Addres: '', Vid: '', FIODirector: '', RazmerKapital: ''}
            ],
            
            tblEmitentUpravleniefields: [
                { key: 'date', headerTitle: 'Дата проведения', label: 'Дата проведения' },
                { key: 'povestka', headerTitle: 'Повестка дня', label: 'Повестка дня'},
            ],
            tblEmitentUpravlenieitems: [
                {date: '', povestka: ''}
            ]
        }
    },
}