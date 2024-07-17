import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueScrollTo from 'vue-scrollto'

import { createRouter, createWebHistory } from 'vue-router'
import TheHome from './components/TheHome.vue'
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import AboutPage from './components/AboutPage.vue'
import TrivialPage from './components/models/TrivialPage.vue'
import UserPage from './components/models/UserPage.vue'
import ItemPage from './components/models/ItemPage.vue'
import MfPage from './components/models/MfPage.vue'
import KnnPage from './components/models/KnnPage.vue'
import NcfPage from './components/models/NcfPage.vue'


const routes = [
  { path: '/', component: TheHome },
  { path: '/login', component: LoginPage },
  { path: '/sign_up', component: SignUpPage },
  { path: '/about', component: AboutPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/models/trivial', component: TrivialPage },
  { path: '/models/user-to-user', component: UserPage},
  { path: '/models/item-to-item', component: ItemPage},
  { path: '/models/matrix-factorization', component: MfPage},
  { path: '/models/k-nearest-neighbor', component: KnnPage},
  { path: '/models/neuronal-collaborative-filtering', component: NcfPage} 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // remote
  // history: createWebHistory(), // local
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0}
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

createApp(App).use(router).use(store).use(VueScrollTo).mount('#app')
