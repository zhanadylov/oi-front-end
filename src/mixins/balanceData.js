export default {
    data (){
        return { 
            balanceData: {
                tblStructuraBalancefields: [
                    {   
                        key: 'Description', 
                        headerTitle: 'Название', 
                        label: 'Название' 
                    },
                    { 
                        key: 'Fromm', 
                        headerTitle: 'с', 
                        label: 'с'
                    },
                    { 
                        key: 'Too',
                        headerTitle: 'до', 
                        label: 'до'
                    },
                ],
                tblStructuraBalanceitems: [
                    {Description: '', Fromm: '', Too: ''}
                ]
            }           
        }
    },
}