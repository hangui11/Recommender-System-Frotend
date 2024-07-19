<!-- Dashboard.vue -->
<script setup>
import { getCurrentUser, logOut } from '@/lib/appwrite';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const username = ref('')

onMounted( async () => {
  try {
    const current_user = await getCurrentUser()
    username.value = current_user.username
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
    <!-- <p >Please log in to access the dashboard.</p> -->
    <button @click="log_out">Logout</button>
  </div>
</template>


