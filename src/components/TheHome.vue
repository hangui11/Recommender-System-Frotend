<script setup>

import { useRouter } from 'vue-router'
import sun from '@/components/icons/sun.png'
const router = useRouter()

const home = () => {
  router.push('/')
}

const login = () => {
  router.push('/login')
}

// const about = () => {
//   router.push('/about')
// }

const sign_up = () => {
  router.push('/sign_up')
}
</script>

<template>
  <div class="nav-container">
    <div class="nav-logo">
      <img  :src="sun" alt="Sun" class="icon" @click="home"/>
      <div @click="home">Sunshine Movies</div>
    </div>
    
    <div class="nav-bar">
      <!-- <div @click="home" class="nav-item">
        Home
        <div class="hover-box"></div>
      </div>

      <div @click="about" class="nav-item">
        About
        <div class="hover-box"></div>
      </div> -->

      <div @click="login" class="nav-item">
        Login
        <div class="hover-box"></div>
      </div>

      <div @click="sign_up" class="nav-item" id="sign-up">
        Sign up
        <div class="hover-box"></div>
      </div>
    </div>
  </div>
  
  <div class="content">
    
    
  </div>
  
</template>

<style scoped>

.nav-container {
  font-family: 'Courier New', Courier, monospace;
  position: sticky;
  display: flex;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3%;
  justify-content: space-between;
  top: 0;
  z-index: 1000;
  
}
.icon {
  height: 35px;
  width: 35px;
  margin-right: 25px;
}

.content {
  /* background-color: rgba(250, 193, 124, 0.5) */
}

.nav-logo {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 30px;
}
.nav-bar {
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
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
  border-radius: 10%;
  pointer-events: none; /* Ensures the hover-box does not interfere with mouse events */
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.nav-item:hover .hover-box {
  opacity: 1;
  transform: scale(1);
}

#sign-up {
  border-radius: 10%;
  color: white;
  background-color: black;
}
</style>
