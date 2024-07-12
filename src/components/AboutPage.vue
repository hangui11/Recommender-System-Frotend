<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import search from '@/assets/icons/search.png'
import about_recommender from '@/assets/images/about_recommender.png'

const router = useRouter()

const home = () => {
  window.location.href = '/'
}

const login = () => {
  router.push('/login')
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
    console.log(input.value)
    if (input.value.toLowerCase() == models[i].toLowerCase()) {
      const auxValue = input.value
      input.value = ''
      router.push(`/${auxValue}`)
    }
  }
  if (modelIndex != -1) {
    router.push(`${modelsFiltered[modelIndex].toLowerCase()}`)
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

    <body>
        <div class="about-1">
            <div class="about-recommenders">
                <h1 class="title">About Our Recommender Systems</h1>
                <div class="text">
                   At Sunshine Movies, we are committed to enhancing your experience with our cutting-edge recommendation technologies. We tailor our 
                   recommendations to suit yout unique preferences, and you can choose the most suitable and personalised option according to your preferences.
                </div>
            </div>
            <img :src="about_recommender" class="img"/>
            
        </div>
        <div class="about-2">

        </div>
    </body>

    <footer>
        <div class="footer-logo">
            <img :src="sun" class="footer-img"/>
            <div class="footer-text">Sunshine Movies</div>
        </div>
        <div class="footer-text2">Feel free to explore, discover, and enjoy the best recommendations tailored just for you!</div>
    </footer>

  <div class="copyright">
    &copy; {{ currentYear }} Sunshine Movies. All rights reserved.
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 0.5rem 1.25rem;
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

body {
    margin: 7% 3%;
    padding: 0 6.5%;
}

.about-1 {
    display: flex;
    flex-direction: row;
}

.img {
    /* margin-top: 2rem; */
    width: 52.5%;
    /* padding-right: 5rem */
}

.about-recommenders {
    margin-right: 4rem;
}

.text {
    text-align: justify
}

footer {
  margin: 0 3%;
  padding: 3% 10%;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  
}

.footer-img {
  width: 2.5rem;
  height: 2.5rem;
}

.footer-text {
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  width: 12rem;
  text-align: justify;
}


.footer-text2 {
  font-weight: 350;
  font-size: 1.2rem;
  padding-bottom: 1.5rem;
  width: 30rem;
  text-align: justify;
  font-style: italic;
}

.copyright {
  padding: 2% 13%;
  background-color: rgba(250, 150, 50, 0.5)
}
.footer-logo {
    width: 22%;
    display: flex;
    justify-content: space-between;
}




</style>