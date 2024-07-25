<!-- Dashboard.vue -->
<script setup>
import { getCurrentUser } from '@/lib/appwrite';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardContainer from './DashboardContainer.vue';

const router = useRouter()
const username = ref('')
const user_avatar = ref('')

onMounted( async () => {
  try {
    const current_user = await getCurrentUser()
    username.value = current_user.username
    user_avatar.value = current_user.avatar
  } catch (error) {
    alert('Do not have user logged')
  }
})





</script>




<template>
  <div>
    <DashboardContainer :avatar="user_avatar" :username="username"/>
    <div class="body">
      <h1 >Welcome, {{ username }} !</h1>

    </div>
    
  </div>
</template>


<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.body {
  position: relative;
  margin: 3% 5%; 
}

</style>