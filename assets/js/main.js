
const URL = 'https://restcountries.com/v3.1/all';
//const URL = '/assets/dataCountry.txt';

Vue.createApp({

    data(){
        return {
            sortField: '',
            sortDirection: true,
            countriesList: [],
            search: '',
            selectedRate: null,
            allCCA: {
                id:454,
            },
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
        getFlag(code){        
            let src = `https://flagcdn.com/w320/${code}.png`;
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

        for (let i = 0; i < data.length; i++) {
            this.allCCA[`${data[i].cca3}`] = `${data[i].cca2}`;    
        }
        
        for (let i = 0; i < data.length; i++) {

            if ("capital" in data[i] == false) {
                console.log("ANTARk");
                continue;
            }

            this.countriesList[i] = {name:'', alpha3Code:'', capital:'', flag:'', borders:[]}
            this.countriesList[i].name = data[i].name.common;
            this.countriesList[i].cca2 = data[i].cca2;
            this.countriesList[i].alpha3Code = data[i].cca3;
            this.countriesList[i].capital = data[i].capital[0];
            this.countriesList[i].flag = data[i].flags.png;
            console.log(i);            
            console.log("borders" in data[i]); 
            
            if ("borders" in data[i]) {            
                for (let k = 0; k < data[i].borders.length; k++) {
                    this.countriesList[i].borders[k] = this.allCCA[`${data[i].borders[k]}`].toLowerCase();
                    console.log(this.countriesList[i].borders[k]);              
                }
            }
            
        }
        console.log(this.countriesList);
        console.log(this.allCCA);
    }

}).mount('#app');

