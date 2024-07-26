<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import search from '@/assets/icons/search.png'
import chevron_down from '@/assets/icons/chevron_down.svg'
import chevron_up from '@/assets/icons/chevron_up.svg'
import profile from '@/assets/icons/profile.svg'
import favourite from '@/assets/icons/favourite.svg'
import signout from '@/assets/icons/signout.svg'

import { getAllSearchMovies, logOut } from '@/lib/appwrite';

const router = useRouter()


const props = defineProps({
    avatar: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const isExpanded = ref(false)
const input = ref('')
let userContainer = ref(null)

const handleClickOutside = (event) => {
  
  if (userContainer.value && !userContainer.value.contains(event.target)) {
    isExpanded.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const dashboard = () => {
  window.location.href = '/dashboard'
}

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

const findAllMovies = async () => {
    try {
        const movies = await getAllSearchMovies(input.value)
        console.log(movies)
    } catch (error) {
        alert(error.message)
    }
}
</script>


<template>
    <div class="nav-container">
      <div class="nav-logo">
        <img  :src="sun" alt="Sun" class="icon" @click="dashboard"/>
        <div class="name" @click="dashboard">Dashboard</div>
      </div>
            
      <div class="nav-search">
        <img :src="search" class="search-logo"/>
        <input id="search" type="text" v-model="input" placeholder="Search a movie" @keydown.enter="findAllMovies"/>
      </div>

      <div class="nav-user">
        <div class="user">
            <img :src="props.avatar" width="55px" class="avatar"/>
            <p class="username">{{ props.username }}</p>
        </div>
        <img class="arrow" ref="userContainer" :src="isExpanded ? chevron_up : chevron_down" @click="isExpanded = !isExpanded"/>
        <transition name="fade">
          <div v-if="isExpanded" class="box">
            <div class="box-item">
                <img :src="profile" class="box-icon"/>
                <p>Profile</p>
            </div>
            <div class="box-item">
                <img :src="favourite" class="box-icon"/>
                <p>Favourite</p>
            </div>
            <div class="box-item" @click="log_out">
                <img :src="signout" class="box-icon"/>
                <p>Sign Out</p>
            </div>
          </div>
        </transition>
        
      </div>
      
      
    </div>


</template>


<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.nav-container {
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  z-index: 1000;
  padding: 1rem 3rem;
  background-color: #ffffff;
  border-bottom: solid 2px rgba(241, 241, 241, 1);
}



.icon {
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.625rem;
  transition: all 0.3s ease-in-out;
}

.nav-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.6875rem;
  transition: all 0.3s ease-in-out;
}

.nav-logo:hover .icon {
  transform: rotate(360deg) scale(1.15);
}

.nav-logo:hover .name{
  color: rgb(226, 133, 93);
}


.nav-user {
    position: relative;
    display: flex;
    z-index: 1000;
}

.user {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 550;
}

.nav-home-bar {
  display: flex;
  align-items: center;
  font-size: clamp(1rem, 3vw, 1.25rem);
  justify-content: space-between;
  padding: 0.3125rem;
  width: 35%;
}

.nav-search {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: text;
  width: 30%;
}

input {
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  margin: 10px;
  width: 100%;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  border: none;
  contain: content;
}

.search-logo {
  width: 1rem;
  height: 1rem;
}

.avatar {
    /* border: solid 0.5px rgba(0, 0, 0, 0.1); */
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    margin-right: 0.8rem;
}


.arrow {
    width: 2rem;
    cursor: pointer;
    margin-left: 5rem;
}

.box {
    position: absolute;
    width: 100%;
    color: black;
    top: 0%;
    transition: all 0.3 ease;
    border-end-start-radius: 20px;
    border-end-end-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding-left: 1rem;
    font-weight: 400;
    z-index: -1;
    transform: translateY(45%);
}

.box-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 50%;
}

.box-icon {
    object-fit: contain;
    width: 1.2rem;
    margin-right: 0.75rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter, .fade-leave-to {
  transform: scaleY(0.1);
  opacity: 0;
}


@media screen and (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .nav-search {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>