<script setup>
import { resetPassword } from '@/lib/appwrite';
import { onMounted } from 'vue';
import { ref } from 'vue';
const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');
const password = ref('')


onMounted(async () => {
    if (secret && userId) {
        console.log('secret:', secret);
        console.log('userId:', userId);
    }
})

const reset_password = async () => {
    try {
        await resetPassword(secret, userId, password.value);
    } catch (e) {
        console.error('Error resetting password:', e);
        alert('An error occurred while resetting your password.');
    }
    
}


</script>


<template>
    <input type="text" v-model="password" id="email" placeholder="Email" required autocomplete="email"/>
    <button @click="reset_password">Reset Password</button>
    forgot_password_page
</template>