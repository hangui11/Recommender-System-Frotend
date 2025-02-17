<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import search from '@/assets/icons/search.png'
import { existCurrentUser } from '@/lib/appwrite';

const router = useRouter()

const home = () => {
  window.location.href = '/'
}

const login = async () => {
  const existUser = await existCurrentUser()
  if (existUser) router.push('/dashboard')
  else router.push('/login')
}

const about = () => {
  router.push('/about')
}

const sign_up = () => {
  router.push('/sign_up')
  // window.location.href = 'https://www.youtube.com/watch?v=Mhy5_DpSDhM';
}

let isSearchFocused = ref(false)
let showModelList = ref(false)
let input = ref("")
let searchContainer = ref(null)
let modelIndex = ref(-1)
let showImage = ref(false)

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
  showImage.value = true
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydowm', handleKeyDown)
})

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
    // console.log(input.value)
    if (input.value.toLowerCase() == models[i].toLowerCase()) {
      const auxValue = input.value
      input.value = ''
      auxValue.replaceAll(' ', '-')
      router.push(`/models/${auxValue}`)
    }
  }
  if (modelIndex != -1) {
    const model = modelsFiltered[modelIndex].toLowerCase().replaceAll(' ', '-')
    router.push(`/models/${model}`)
  }
}

const closeModelList = () => {
    showModelList.value = false
    modelIndex.value = -1
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
        <input id="search" type="text" v-model="input" :placeholder="isSearchFocused ? '' : 'Search recommender model'" autocomplete="off" @click="isSearchFocused=true; showModelList=true" @input="isSearchFocused=true; showModelList=true" @focus="isSearchFocused=true; showModelList=true" @blur="isSearchFocused=false" @keydown.down="selectDown" @keydown.up="selectUp" @keydown.enter="enterModel(modelIndex)" @keydown.escape="closeModelList"/>
        <div class="model-list" v-if="showModelList">
            <div v-for="(model, index) in filtereModel()" :key="model" class="model-item" :class="{'key-selected' : index == modelIndex}" @click="enterModel(index)">{{ model }}</div>
            <div class="model-item" v-if="showModelList&&!filtereModel().length">No results found!</div>
        </div>
      </div>

      <div class="nav-bar">
        <div class="nav-home-bar">
            <div @click="home" class="nav-item">
              HOME
            </div>

            <div @click="about" class="nav-item">
              ABOUT
            </div>
        </div>

        <div class="nav-login-bar">
            <div @click="login" class="nav-item">
              LOGIN
            </div>

            <div @click="sign_up" class="nav-item" id="sign-up">
              SIGN UP
            </div>
        </div>
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
  padding: 1.5rem 2rem;
  background-color: #ffffff;
  border-bottom: solid 2px rgba(241, 241, 241, 1);
}

.nav-bar {
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  width: 35%;
}

.icon {
  height: 2.2rem;
  width: 2.2rem;
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

.nav-login-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: clamp(1rem, 3vw, 1.25rem);
  width: 36.5%;
}

#sign-up {
  border-radius: 10px;
  transition: all 0.3s ease;
  color: rgba(250, 75, 0, 0.822);
}

#sign-up:hover {
  box-shadow: 0 0 15px rgba(245, 75, 2, 0.5);
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
  padding-inline: 1rem;
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
}

.model-list {
  position: absolute;
  top: 102%;
  left: 0;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.model-item {
  padding: 1rem 1.25rem;
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
  min-width: 16.25rem;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  border: none;
  width: auto;
  contain: content;
  max-width: 20rem;
}

.search-logo {
  width: 1rem;
  height: 1rem;
}

.nav-item {
  position: relative;
  cursor: pointer;
  padding: 0.625rem;
  transition: all 0.3s ease;
}

.nav-item:hover {
  background-color: rgba(226, 133, 93, 0.2);
  border-radius: 10px; 
  transform: scale(1.05);
}

@media screen and (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }

  .nav-bar {
    width: 100%;
    margin-top: 1rem;
  }

  .nav-search {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>