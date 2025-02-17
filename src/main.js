import './assets/main.css'
import 'notivue/notification.css' // Only needed if using built-in <Notification />
import 'notivue/animations.css' // Only needed if using default animations

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import VueScrollTo from 'vue-scrollto'
import { createNotivue } from 'notivue'

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
import ForgotPasswordPage from './components/ForgotPwdPage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import { existCurrentUser } from './lib/appwrite'

import vue3StarRatings from 'vue3-star-ratings'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const routes = [
  { path: '/', component: TheHome },
  { path: '/login', component: LoginPage },
  { path: '/sign_up', component: SignUpPage },
  { path: '/about', component: AboutPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/forgotPassword', component: ForgotPasswordPage, props: true},
  { path: '/models/trivial', component: TrivialPage },
  { path: '/models/user-to-user', component: UserPage},
  { path: '/models/item-to-item', component: ItemPage},
  { path: '/models/matrix-factorization', component: MfPage},
  { path: '/models/k-nearest-neighbor', component: KnnPage},
  { path: '/models/neuronal-collaborative-filtering', component: NcfPage} ,
  { path: '/:pathMatch(.*)*', component: NotFoundPage } // Ruta comodín para manejar 404
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // remote
  // history: createWebHistory(), // local
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top: 0}
  }
})

router.beforeEach( async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  

  if (requiresAuth) {
    const isAuthenticated = await existCurrentUser()
    if (! isAuthenticated) return next('/login');
    else return next()
  }
  return next()
})

const notivue = createNotivue()

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(router).use(store).use(VueScrollTo).use(notivue).use(vuetify).component('vue3-star-ratings', vue3StarRatings).mount('#app')
