
const URL = 'https://restcountries.eu/rest/v2/all';

Vue.createApp({

    data(){
        return {
            sortField: '',
            sortDirection: true,
            countriesList: [],
            search: '',
            selectedRate: null
        }
    },

    methods: {
        setSort(field){
            this.sortField = field;
            this.sortDirection = !this.sortDirection;
        },
        isOK(item){
            
            let s = this.search.toLowerCase();

                //console.log(item[key]);
                if(item.name.toString().toLowerCase().includes(s)||
                    item.alpha3Code.toString().toLowerCase().includes(s)||
                        item.capital.toString().toLowerCase().includes(s)){

                    return true;
                }

            return false;
            
        },
        // show(item){
        //     this.selectedRate = item;
        //     rateDialog.showModal();
        // },
        // closeDailog(){
        //     rateDialog.close();
        // },
        getFlag(code){        
            let src = `https://restcountries.eu/data/${code.toLowerCase()}.svg`;
            return src;
        }
    },

    computed: {
        showList(){

            let result = this.countriesList.filter(i => this.isOK(i));

            if(this.sortField){

                result.sort((a, b) => {

                    if(this.sortDirection){
                        return a[this.sortField] > b[this.sortField] ? 1 : -1;
                    }else {
                        return a[this.sortField] > b[this.sortField] ? -1 : 1;
                    }
                });
            }
            return result;
        }
    },

    async mounted(){
        let data = await fetch(URL);
            data = await data.json();

        console.log(data);

        //this.countriesList = data;
        
        for (let i = 0; i < data.length; i++) {
            this.countriesList[i] = {name:'', alpha3Code:'', capital:'', flag:'', borders:''}
            this.countriesList[i].name = data[i].name;
            this.countriesList[i].alpha3Code = data[i].alpha3Code;
            this.countriesList[i].capital = data[i].capital;
            this.countriesList[i].flag = data[i].flag;
            this.countriesList[i].borders = data[i].borders;
        }
        console.log(this.countriesList);
    }

}).mount('#app');

