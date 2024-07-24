<!-- Dashboard.vue -->
<script setup>
import { getCurrentUser, logOut } from '@/lib/appwrite';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

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

const log_out = async () => {
  try {
    const session = await logOut()
    console.log(session)
    setTimeout(() => {
      router.replace('/login')
    }, 500);
  } catch (error) {
    alert(error.message)
  }
}



</script>




<template>
  <div>
    <h1>Dashboard</h1>
    <p >Welcome, {{ username }}!</p>
    <img :src="user_avatar" width="100px"/>
    <!-- <p >Please log in to access the dashboard.</p> -->
    <button @click="log_out" class="logout">Logout</button>
  </div>
</template>


<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

</style>