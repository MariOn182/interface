Vue.directive('mask', VueMask.VueMaskDirective);

var app = new Vue({
    el: '#app',
    components: {
        vuejsDatepicker,
    },
    data: {
        urls: {
            serverURL: 'http://localhost:8080/alice/testserver',
        },
        isPreloaderActive: false,
        isTable: false,
        currentDepartment: '',
        timeMask: [ /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/, ' - ', /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/],
        departmentsList: [],
        tables :[],

    },
    created: function () {
        this.isPreloaderActive = true;
        axios({
            method: 'get',
            url: this.urls.serverURL,
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
    methods: {
        getTable() {
            this.isPreloaderActive = true;
            this.isTable = true;
            axios({
                method: 'get',
                url: this.urls.serverURL,
                params: {
                    department: this.currentDepartment,
                }
            }).then((response) => {
                this.tables=response.data.table;
            }).catch((error) => {
                console.error(error + " --- error in get table")
            });
            this.isPreloaderActive = false;
        },
        deleteTable(index) {
            this.tables.splice(index, 1);
        },
        addNewTable() {
               this.tables.push({
                group:"",
                date: new Date(Date.now()),
                days:[],
                status:"",
                time:"",} );

        },
        sendData (){
            axios({
                method: 'post',
                url: this.urls.serverURL,
                params: {
                    department: this.currentDepartment,
                    body: JSON.stringify(this.tables),
                }
            }).catch((error) => {
                console.error(error + " --- error in post groups")
            });
        }

    }

}

);
