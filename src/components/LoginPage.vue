<script setup>
import recommender_system_img from '@/assets/recommender_system.jpg'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

const router = useRouter()
const store = useStore()

const username = ref('')
const password = ref('')

const users = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('https://sunshine-movies-backend.vercel.app/users');
    users.value = response.data;
  } catch (error) {
    console.error(error);
  }
});
const loginUser = () => {
  const user = users.value.find((u) => u.username == username.value && u.password == password.value)

  if (user) {
    store.dispatch('login', user)
    router.push('/dashboard')
  } else {
    alert('Invalid username or password')
  }
}


const home = () => {
  router.push('/')
}

const about = () => {
  router.push('/about')
}

const login = () => {
  router.push('/login')
}

const sign_up = () => {
  router.push('/sign_up')
}
</script>

<template>
  <div class="nav">
    <div @click="home" class="nav-item">
      HOME
      <div class="hover-box"></div>
    </div>

    <div @click="about" class="nav-item">
      ABOUT
      <div class="hover-box"></div>
    </div>
    
      <div @click="login" class="nav-item">
      LOGIN
      <div class="hover-box"></div>
    </div>

    <div @click="sign_up" class="nav-item">
      SIGN UP
      <div class="hover-box"></div>
    </div>
  </div>

  <div class="row">
    <div id="image">
      <img :src="recommender_system_img" alt="recommender system" width="100%" height="100%" />
    </div>
    <div class="container">
      <div class="box">
        <h1 id="login">LOGIN</h1>
        <form class="form" @submit.prevent="loginUser" autocomplete="off">
          <div class="user">
            <input type="text" v-model="username" id="username" placeholder="Username" required />
          </div>
          <div class="password">
            <input
              type="password"
              v-model="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <a id="forgot_pwd" href="./forgot_pwd">Forgot Password?</a>
          <button id="button" type="submit">Login</button>
        </form>

        <a id="signup" href="/sign_up">Sign Up</a>
      </div>
    </div>
  </div>
</template>



<style>

.nav {
  height: 5%;
  position: sticky;
  display: flex;
  margin-bottom: 1px;
  justify-content: space-between;
  top: 0;
  z-index: 1000;
}

.nav-item {
  font-weight: bold;
  position: relative;
  cursor: pointer;
  padding: 10px;
}

 .hover-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15%;
  pointer-events: none; /* Ensures the hover-box does not interfere with mouse events */
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.nav-item:hover .hover-box {
  opacity: 1;
  transform: scale(1);
}

.row {
  width: 100%;
  height: 94%;
  display: flex;
}

#image {
  width: 50%;
  height: 100%;
}

.container {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#login {
  align-self: center;
  font-size: 2em;
  margin-bottom: 20%;
}

.box {
  width: 40%;
  height: 60%;
  padding: 2em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
  background-color: white;
  border-radius: 8px;
  margin: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user .password {
  width: 100%;
}

#forgot_pwd {
  margin-top: 8px;
  margin-bottom: 15%;
}

input {
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  margin: 10px;
}

#button {
  cursor: pointer;
  width: 75%;
  border-radius: 10px;
}

.form {
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#signup {
  margin-top: 40%;
  font-size: 1em;
}
</style>
