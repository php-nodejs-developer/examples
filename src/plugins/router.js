import { createRouter, createWebHistory } from 'vue-router'
import VuexExample from '../views/VuexExample.vue'
import ImagesExample from '../views/ImagesExample.vue'

const routes = [
  {
    path: '/vuex',
    component: VuexExample
  },
  {
    path: '/images',
    component: ImagesExample
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
