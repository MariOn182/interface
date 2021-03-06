Vue.directive('mask', VueMask.VueMaskDirective);
let serverURL = "http://localhost:8080/alice/testserver";

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
                timeMask: [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/, ' - ', /[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/],
                departmentsList: [],
                departmentInfo: {
                    name: '',
                    table: [],
                }


            }
        },
        created: function () {
            this.loadDepartmetsList()
        },

        methods: {
            loadDepartmetsList() {
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
                axios({
                    method: 'get',
                    url: serverURL,
                    params: {
                        department: this.currentDepartment,
                    }
                }).then((response) => {
                    this.departmentInfo = response.data;
                    if (typeof this.departmentInfo !== "object" || this.departmentInfo === null) {
                        this.departmentInfo = {
                            name: this.currentDepartment,
                            table: [],
                        }
                    }
                    this.isTableVisible = true;
                }).catch((error) => {
                    console.error(error + " --- error in get table")
                });
                this.isPreloaderActive = false;
            },
            deleteTable(index) {
                this.departmentInfo.table.splice(index, 1);
            },
            addNewTableRow() {
                this.departmentInfo.table.push({
                    //TODO реализовать поле id для :key в v-for после добавления на реальный сервер
                    group: "",
                    date: new Date(Date.now()),
                    days: [],
                    status: "",
                    time: "",
                });

            },
            sendTable() {
                axios({
                    method: 'post',
                    url: serverURL,
                    params: {
                        department: this.currentDepartment,
                        body: JSON.stringify(this.departmentInfo.table),
                    }
                }).catch((error) => {
                    console.error(error + " --- error in post groups")
                });
            }

        }

    }
);
