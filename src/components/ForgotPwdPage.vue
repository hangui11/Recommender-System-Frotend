<script setup>
import { resetPassword } from '@/lib/appwrite';
import { onMounted } from 'vue';

const urlParams = new URLSearchParams(window.location.search);
const secret = urlParams.get('secret');
const userId = urlParams.get('userId');

onMounted(async () => {
    if (secret && userId) {
        console.log('secret:', secret);
        console.log('userId:', userId);
    }
})


</script>


<template>

    forgot_password_page
</template>