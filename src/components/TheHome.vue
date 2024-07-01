<script setup>

import { useRouter } from 'vue-router'

const router = useRouter()

const home = () => {
  router.push('/')
}

const login = () => {
  router.push('/login')
}

const about = () => {
  router.push('/about')
}

const sign_up = () => {
  router.push('/sign_up')
}
</script>

<template>
  <div class="icon"></div>
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
  <div class="content">
    
    
  </div>
  
</template>

<style scoped>

.icon {

}

.content {
  background-color: rgba(250, 193, 124, 0.5)
}
.nav {
  position: sticky;
  display: flex;
  margin: auto;
  justify-content: space-between;
  top: 0;
  z-index: 1000;
  border-bottom: solid 2px black;
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

template {
  background-color: aqua
}
</style>
