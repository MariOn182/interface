Vue.directive('phone', {
    bind(el) {
        el.oninput = function(e) {
            if (!e.isTrusted) {
                return;
            }
            let x = this.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            this.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            el.dispatchEvent(new Event('input'));
        }
    }
});



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
        departmentsList: [],
        isPreloaderActive: false,
        groupsList :[{
            id: '1',
            type: 'Вечерняя',
            startDate: new Date(2016, 9,  16),
            daysOfTheWeek:['Понедельник','Суббота','Среда',],
            status:'Донабор',
            timeLessons: '',
        },

            {
            id: '1',
            type: 'Вечерняя',
            startDate: new Date(2016, 9,  16),
            daysOfTheWeek:['Понедельник','Суббота','Среда',],
            status:'Донабор',
            timeLessons: '',
        },
            {
                id: '2',
                type: 'Ночная',
                startDate: new Date(2018, 2,  5),
                daysOfTheWeek:['Среда'],
                status:'Идет набор',
                timeLessons: '',
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
