import {createStore} from 'vuex'
// паттерн управления состоянием + библиотека
/*let store = {
  state: {}, состояние
  getters: {}, геттеры - методы, которые возвращают отфильтрованные данные из state
  mutations: {}, мутации - методы для изменения данных из state, мутации не могут быть асинхронными
  actions: {}, действия - методы для вызова мутаций, действия могут быть асинхронными
  modules: {}
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
    visited(state){ // доступ в компоненте: this.$store.getters.visited
      return state.countries.filter(country => country.visited);
    },
    byFirstLetter: (state) => (letter) => { // доступ в компоненте: this.$store.getters.byFirstLetter(данные)
      return state.countries.filter(country => country.name.startsWith(letter));
    },
    randomCountry(state, getters){ // доступ в компоненте: this.$store.getters.randomCountry
      return getters.visited[Math.floor(Math.random() * state.countries.length)];
    }
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
    addToList ({commit}, country) {
      commit('pushCountry', country)
    },
    removeFromList({commit}, country){
      commit('removeCountry', country)
    }
  }
})
