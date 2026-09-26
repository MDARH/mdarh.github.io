import { createRouter, createWebHashHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'

const loadComponent = (component) => {
  return () => import(`../views/${component}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: loadComponent('HomeView')
  },
  {
    path: '/experience',
    name: 'experience',
    component: loadComponent('ExperienceView')
  },
  {
    path: '/projects',
    name: 'projects',
    component: loadComponent('ProjectsView')
  },
  {
    path: '/contact',
    name: 'contact',
    component: loadComponent('ContactView')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
