Vue.directive('mask', VueMask.VueMaskDirective);



var app = new Vue({
    el: '#app',
    components: {
        vuejsDatepicker,
    },
    data: {
        urls: {
            departmentsUrl: 'http://localhost:8080/alice/testserver',
            serverURL: 'www.google.com',
        },
        current: '',
        timeMask: [ /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/, ' - ', /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/],
        departmentsList: [],
        isPreloaderActive: false,
        groupsList :[{
            type: 'Вечерняя',
            startDate: new Date(2016, 9,  16),
            daysOfTheWeek:['Понедельник','Суббота','Среда',],
            status:'Донабор',
            timeLessons: '12:40-17:25',
        },

            {
            type: 'Вечерняя',
            startDate: new Date(2012, 3,  11),
            daysOfTheWeek:['Понедельник','Среда',],
            status:'Донабор',
            timeLessons: '10:40-14:00',
        },
            {
                type: 'Ночная',
                startDate: new Date(2018, 2,  5),
                daysOfTheWeek:['Среда'],
                status:'Идет набор',
                timeLessons: '13:40-19:30',
            }],
    },
    created: function () {
        this.isPreloaderActive = true;
        axios.get(this.urls.departmentsUrl)
            .then((response) => {
                this.departments = response.data;
            })
            .catch((error) => {
                console.error(error + " --- error in get departments!")
            })
        this.isPreloaderActive = false;
    },
    methods: {
        getTable() {
            this.isPreloaderActive = true;
            axios({
                method: 'get',
                url: this.urls.serverURL,
                params: {
                    department: this.current,
                }
            }).catch((error) => {
                console.error(error + " --- error in get table")
            });
            this.isPreloaderActive = false;
        }
    }
});
