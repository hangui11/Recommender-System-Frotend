<!-- Dashboard.vue -->
<template>
  <div>
    <h1>Dashboard</h1>
    <p v-if="isAuthenticated">Welcome, {{ user.username }}!</p>
    <p v-else>Please log in to access the dashboard.</p>
    <button @click="logout" v-if="isAuthenticated">Logout</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const user = computed(() => store.state.user)

const logout = () => {
  store.dispatch('logout')
  router.push('/login')
}
</script>
