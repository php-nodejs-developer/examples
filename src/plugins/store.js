import {createStore} from 'vuex'

/*
1) import {createStore} from 'vuex'
2) let settings = {настройки хранилища};
3) export default createStore(settings);
*/

// паттерн управления состоянием + библиотека
/*let settings = {
  state: { this.$store.state
    task: {  }, this.$store.state.task
    items: [{}, {}], this.$store.state.items
    active: true this.$store.state.active
  }, хранилище (состояние)
  доступ (к state) на чтение неотфильтрованных данных в компоненте:
  this.$store.state

  getters: {}, геттеры - методы,
  которые возвращают отфильтрованные данные из state

  mutations: {}, мутации - методы для изменения данных из state,
  методы в mutations не могут быть асинхронными
  мутации можно вызвать в компоненте или в actions

  actions: {}, действия - методы для вызова мутаций,
  методы в actions могут быть асинхронными

  modules: {} для хранение большого количества данных
}*/
export default createStore({
  // состояние (хранимые данные)
  state: { // доступ в компоненте: this.$store.state
    countries: [ // доступ в компоненте: this.$store.state.countries
      {name: 'Бельгия', visited: true},
      {name: 'Австрия', visited: false},
      {name: 'Австралия', visited: false},
      {name: 'Венгрия', visited: true},
    ]
  },
  // геттеры для фильтрации данных из state
  getters: {  // доступ в компоненте: this.$store.getters

    // в компоненте: this.$store.getters.firstGetter
    /*firstGetter(state, getters){
      // доступ к данным из state: state.countries
      // вызов геттеров: getters.secondGetter
      return /!* отфильтрованные данные *!/
    },
    // в компоненте: this.$store.getters.secondGetter
    secondGetter(state, getters){ },*/

    visited(state){ // доступ в компоненте: this.$store.getters.visited
      return state.countries.filter(country => country.visited);
    },
    randomCountry(state, getters){ // доступ в компоненте:
      // this.$store.getters.randomCountry
      return getters.visited[Math.floor(Math.random()
          * state.countries.length)];
    },

    // доступ в компоненте: this.$store.getters.byFirstLetter(данные)
    byFirstLetter: (state) => (letter) => {
      return state.countries
          .filter(country => country.name.startsWith(letter));
    },

  },
  // мутации - методы для изменения данных из state
  // мутации не могут быть асинхронными
  mutations: {
    // доступ в компоненте:
    // this.$store.commit('имяМутации', данные);
    // либо:
    // import { mapMutations } from 'vuex';
    /*
    methods: {
      ...mapMutations(['имяМутации']), вариант 2
      ...mapMutations({
          имяДляИспользованияВКомпоненте: 'имяМутации', вариант 3
      })
    }
    */

    // mutation(state, arg1, arg2, arg3 и тд){
    //    доступ к данным из state: state.countries
    //    arg1, arg2, arg3 и тд - данные, передываемые компонентом
    // }

    // доступ в компоненте:
    // this.$store.commit('имяМутации', данные);
    // this.$store.commit('mutation', 12, 34, 1 и тд);


    changeState(state, country){
      state.countries.forEach(inList => {
        if (inList.name === country.name) inList.visited = !inList.visited;
      })
    },
    pushCountry(state, country) {
      state.countries.push(country);
    },
    removeCountry(state, country){
      state.countries = state.countries.filter(inList => inList.name !== country.name);
    }
  },
  // действия - методы для вызова мутация
  // действия могут быть асинхронными
  actions: {
    // доступ в компоненте:
    // this.$store.dispatch('имяДействия', данные);
    // либо:
    // import { mapActions } from 'vuex';
    /*
    methods: {
      ...mapActions(['имяДействия']), вариант 2
      ...mapActions({
          имяДляИспользованияВКомпоненте: 'имяДействия', вариант 3
      })
    }
    */
    // addToList (store, данные передаваемые компонентом) {
    //      store.commit('имя_мутации', данные передаваемые компонентом )
    // }
    addToList ({commit}, country) {
      // асинхронные дейсвия...
      // когда эти дейсвия будут выполнены,
      // будет вызвана мутация
      commit('pushCountry', country)
    },
    removeFromList({commit}, country){
      commit('removeCountry', country)
    }
  }
})




// Вариант 1: vue add vuex

// Вариант 2:
// 1. npm install vuex@next --save
// 2. создать js файл, из которого экспортируется объект vuex
// 3. в main.js фале необходимо импортировать данный объект
// и подключить к vue приложению: .use(store)

//
// addFiles(event){
//   let allFiles = event.target.files;
//   // в цикле
//   file.name;
//   file.size;
//
//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   file.result;
// }