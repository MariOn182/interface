Vue.directive('mask', VueMask.VueMaskDirective);

var app = new Vue({
    el: '#app',
    components: {
        vuejsDatepicker,
    },
    // `data` должна быть функцией, возвращающей объект. В документации об этом написано.
    data: {
        // Данные используются только в js, в шаблоне они не нужны, соответственно делать их реактивными,
        // помещая в `data` тоже не имеет смысла.
        // Лучше вынести в переменную в начале файла. Да и объект в данном случае не нужен, достаточно `serverURL`.
        urls: {
            serverURL: 'http://localhost:8080/alice/testserver',
        },
        isPreloaderActive: false,
        // Непонятно что за такое "является таблицей". С прелоадером (выше) вышло удачнее.
        isTable: false,
        currentDepartment: '',
        timeMask: [ /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/, ' - ', /[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/],
        departmentsList: [],
        // Таблица вроде одна, но поле говорит, что их много. Странно :)
        tables :[],

    },
    // Смешивание стиля кода - не очень хорошо. Если везде функции сокращены до `functionName() {}`, то и здесь должно быть едино
    // Делать хуки вью толстыми с логикой - плохая идея. Лаконичнее было бы вынести все это в метод, а здесь просто делать его вызов.
    created: function () {
        this.isPreloaderActive = true;
        // Пока и так сойдет, но на будущее на заметку.
        // Сервис работы с АПИ должен быть вынесен в отдельный файл/набор файлов. По его структуре поговорим потом.
        // И общение с АПИ из вью сведется к вызову одного метода в глобальном объекте, а не вот это вот все дублирование.
        axios({
            method: 'get',
            url: this.urls.serverURL,
            params: {
                department: "all",
            }
        }).then((response) => {
            // А если сервер вернет не массив, а `null` или еще что-то непристойное? Что произойдет с версткой?
            this.departmentsList = response.data;
        }).catch((error) => {
            console.error(error + " --- error in get departments!")
        });

        this.isPreloaderActive = false;
    },
    methods: {

        getTable() {
            this.isPreloaderActive = true;
            // Рано радуешься, данные с сервера могут не прийти, а флаг уже дал добро на рендер таблицы.
            // При таком подходе ставим флаги только при успешном ответе сервера и существовании данных.
            // В частности в `then` при условии не пустого значения `response.data.table`.
            // Я бы лучше вообще перенес этот флаг из `data` в `computed`.
            this.isTable = true;
            axios({
                method: 'get',
                url: this.urls.serverURL,
                params: {
                    department: this.currentDepartment,
                }
            }).then((response) => {
                // А если сервер вернет не массив, а `null` или еще что-то непристойное? Что произойдет с версткой?
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
        // Максимально детализируем в имени функции то, для чего она предназначена. "Отправка данных" звучит слишком абстрактно.
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
