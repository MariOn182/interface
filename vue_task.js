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
        groupsList :[],

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
            this.isTable=true;
            axios({
                method: 'get',
                url: this.urls.serverURL,
                params: {
                    department: this.currentDepartment,
                }
            }).then((response) => {
                this.groupsList=response.data;
            }).catch((error) => {
                console.error(error + " --- error in get table")
            });
            this.isPreloaderActive = false;
        },
        deleteGroup(index){
            this.groupsList.splice(index, 1);
        },
        addNewGroup(){

        }
    }
});
