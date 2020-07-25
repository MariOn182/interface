Vue.directive('mask', VueMask.VueMaskDirective);
let serverURL= "http://localhost:8080/alice/testserver";

var app = new Vue({
    el: '#app',
    components: {
        vuejsDatepicker,
    },
    data: function () {
            return {
        isPreloaderActive: false,
         isTableVisible: false,
        currentDepartment: '',
        timeMask: [ /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/, ' - ', /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/],
        departmentsList: [],
        table :[],

    }
    },
    created: function (){this.loadDepartmetsList()},

    methods: {
        loadDepartmetsList () {
            this.isPreloaderActive = true;
            axios({
                method: 'get',
                url: serverURL,
                params: {
                    department: "all",
                }
            }).then((response) => {
                this.departmentsList = response.data;
            }).catch((error) => {
                console.error(error + " --- error in get departments!")
            });

            this.isPreloaderActive = false;
        },
        getTable() {
            this.isPreloaderActive = true;
            this.isTableVisible = true;
            axios({
                method: 'get',
                url: serverURL,
                params: {
                    department: this.currentDepartment,
                }
            }).then((response) => {
                this.table=response.data.table;
            }).catch((error) => {
                console.error(error + " --- error in get table")
            });
            this.isPreloaderActive = false;
        },
        deleteTable(index) {
            this.table.splice(index, 1);
        },
        addNewTable() {
               this.table.push({
                group:"",
                date: new Date(Date.now()),
                days:[],
                status:"",
                time:"",} );

        },
        sendTable (){
            axios({
                method: 'post',
                url: serverURL,
                params: {
                    department: this.currentDepartment,
                    body: JSON.stringify(this.table),
                }
            }).catch((error) => {
                console.error(error + " --- error in post groups")
            });
        }

    }

}

);
