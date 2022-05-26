<template>
  <section>
    <button class="letter"
            :class="{active: letter === currentLetter}"
            @click="[filter = 'letter', currentLetter = letter]"
            v-for="letter in letters" :key="letter">
      {{letter}}
    </button>
    <button class="letter"
            :class="{active: currentLetter === ''}"
            @click="[filter = 'all', currentLetter = '']">
      Все страны
    </button>
    <div class="country" v-for="country in countries" :key="country.name">
      <span class="country_name">{{country.name}}</span>
      <button class="country_visited" @click="checkVisited(country)">
        {{country.visited ? "+" : "-"}}
      </button>
    </div>

    <div>
      <input type="text" placeholder="Новая страна" v-model.trim="countryName">
      <button @click="addToList({name: countryName, visited: false})">Добавить</button>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
export default {
  data(){
    return {
      filter: "all",
      currentLetter: "",
      letters: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      countryName: ""
    }
  },
  computed:{
    countries(){
      return this.filter === "all"
          ? this.$store.state.countries // Доступ к state
          : this.$store.getters.byFirstLetter(this.currentLetter); // доступ к геттерам
    }
  },

  methods: {
    /*checkVisited(country) {
      this.$store.commit('changeState', country);
    },*/

    // ...mapMutations(['changeState'])
    // мутация с именем changeState становится одним из метдов компонента

    // @click="checkVisited(country)
    ...mapMutations({
      // обращение к мутации в текущем компоненте:  имя мутации во vuex
       checkVisited: 'changeState'
    }),

    ...mapActions(['addToList'])
  }
}
</script>
<style scoped>
.country {
  margin-bottom: 1rem;
}
.country_name {
  padding: .5rem 1rem;
}
.country_visited {
  line-height: 1rem;
  padding: .1rem .5rem;
}
.letter {
  margin-bottom: 1rem;
  line-height: 1rem;
  padding: .1rem .5rem;
}
.active {
  background-color: #42b983;
}
</style>