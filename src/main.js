import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import { createRouter, createWebHistory } from 'vue-router'
import TheHome from './components/TheHome.vue'
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'
import SignUpPage from './components/SignUpPage.vue'
import AboutPage from './components/AboutPage.vue'

const routes = [
  { path: '/', component: TheHome },
  { path: '/login', component: LoginPage },
  { path: '/sign_up', component: SignUpPage },
  { path: '/about', component: AboutPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
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

createApp(App).use(router).use(store).mount('#app')
