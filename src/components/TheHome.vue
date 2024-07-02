<script setup>

import { useRouter } from 'vue-router'
import sun from '@/components/icons/sun.png'
import search from '@/components/icons/search.png'
import { ref, onMounted, onUnmounted } from 'vue'



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

let isSearchFocused = ref(false)
let showModelList = ref(false)
let input = ref("")
const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']

// const selectModel = (index, keyWord=false) => {
//   const modelsFiltered = filtereModel()
//   input.value = modelsFiltered[index].toLowerCase()
//   console.log(input.value)
//   if (! keyWord) showModelList.value = false
// }

const filtereModel = () => {
  return models.filter((model) => model.toLowerCase().includes(input.value.toLowerCase()));
}

let searchContainer = ref(null)

const handleClickOutside = (event) => {
  
  if (searchContainer.value && !searchContainer.value.contains(event.target)) {
    showModelList.value = false
    modelIndex.value = -1
  }
}


const handleKeyDown = (event) => {
  if (input.value.length > 0 && event.key == "Enter") enterModel(-1)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydowm', handleKeyDown)
})

let modelIndex = ref(-1)

const selectDown = () => {
  const modelsFiltered = filtereModel()
  ++modelIndex.value
  if (modelIndex.value == modelsFiltered.length) modelIndex.value = 0
}

const selectUp = () => {
  const modelsFiltered = filtereModel()
  if (modelIndex.value == 0 || modelIndex.value == -1) modelIndex.value = modelsFiltered.length
  --modelIndex.value
  
}

const enterModel = (modelIndex) => {
  const modelsFiltered = filtereModel()
  for (let i = 0; i < models.length; ++i) {
    console.log(input.value)
    if (input.value.toLowerCase() == models[i].toLowerCase()) {
      console.log('hola')
      const auxValue = input.value
      input.value = ''
      router.push(`/${auxValue}`)
    }
  }
  if (modelIndex != -1) {
    router.push(`${modelsFiltered[modelIndex].toLowerCase()}`)
  }
}

</script>

<template>
  <div class="nav-container">
    <div class="nav-logo">
      <img  :src="sun" alt="Sun" class="icon" @click="home"/>
      <div class="name" @click="home">Sunshine Movies</div>
    </div>
    
    <div class="nav-search" ref="searchContainer">
          <img :src="search" class="search-logo"/>
          <input id="search" type="text" v-model="input" :placeholder="isSearchFocused ? '' : 'Search recommender model'" autocomplete="off" @focus="isSearchFocused=true; showModelList=true" @blur="isSearchFocused=false" @keydown.down="selectDown" @keydown.up="selectUp" @keydown.enter="enterModel(modelIndex)"/>
          <div class="model-list" v-if="showModelList">
            <div v-for="(model, index) in filtereModel()" :key="model" class="model-item" :class="{'key-selected' : index == modelIndex}" @click="enterModel(index)">{{ model }}</div>
            <div class="model-item" v-if="showModelList&&!filtereModel().length">No results found!</div>
          </div>
    </div>


    <div class="nav-bar">
      <div class="nav-home-bar">
        <div @click="home" class="nav-item">
          Home
        </div>

        <div @click="about" class="nav-item">
          About
        </div>
      </div>

      <div class="nav-login-bar">
        <div @click="login" class="nav-item">
          Login
        </div>

        <div @click="sign_up" class="nav-item" id="sign-up">
          Sign up
        </div>
      </div>
    </div>
  </div>

  <div class="description">
    AI-powered Personalization Plataform
  </div>
  
  <div class="content">
    
  </div>
  
</template>

<style scoped>

.nav-container {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  position: sticky;
  display: flex;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1.5%;
  justify-content: space-between;
  align-items: center;
  top: 0;
  z-index: 1000;
  padding-bottom: 10px;
  margin-bottom: 5%;
  
}


.nav-bar {
  width: 35%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  height: 35px;
  width: 35px;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
  
}

.nav-logo {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  font-size: 27px;
  transition: all 0.3s ease-in-out;
}


.nav-logo:hover .icon {
  transform: rotate(360deg) scale(1.15);
}

.nav-logo:hover .name{
  color: rgb(226, 133, 93);
}

.nav-login-bar {
  width: 36.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}

#sign-up {
  border-radius: 10px;
  /* background-color: rgba(250, 75, 0, 0.822); */
  transition: all 0.3s ease;
  color: rgba(250, 75, 0, 0.822);
}

#sign-up:hover {
  box-shadow: 0 0 15px rgba(245, 75, 2, 0.5);
}

.nav-home-bar {
  width: 35%;
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: space-between;
  padding: 5px;
}


.nav-search {
  position: relative;
  width: 30%;
  display: flex;
  align-items: center;
  border: solid 1px black;
  padding-inline: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: text
}

.model-list {
  position: absolute;
  top: 102%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.model-item {
  padding: 7px;
  cursor: pointer;
}

.model-item:hover {
  background-color: #f0f0f0;
  border-radius: 10px;
}

.key-selected {
  background-color: #f0f0f0;
  border-radius: 10px;
}

#search {
  min-width: 260px;
  width: auto;
  font-size: 16px;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  border: none;
}

.search-logo {
  width: 15px;
  height: 15px;
}

.nav-item {
  position: relative;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(226, 133, 93, 0.2);
  border-radius: 10px; 
  transform: scale(1.05);
}




.description {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: xx-large;
  font-weight: bolder;
  margin-left: 3%;
  margin-right: 3%;
}

</style>
