<script setup>

import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import search from '@/assets/icons/search.png'
import point from '@/assets/icons/point.svg'

import personalized_recommendation from '@/assets/images/personalized-recommendations.png'
import ModelComponent from '@/components/ModelComponent.vue'
import ModelDescription from '@/components/ModelDescription.vue'

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
// let modelContent = ref(1)
let pointerModel = ref('Trivial');

const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']
const currentYear = new Date().getFullYear()

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

  <div class="header">
    <div class="description" :class="{'description-enter-active' : showImage}">
      <h1>Artificial Intelligent Powered Recommender</h1>
      <p>Our AI personalization engine offers six different recommender models, each with its own architecture and algorithm to compute personalized movie suggestions, ensuring a satisfying user experience.</p>
      <button @click="sign_up" class="button" >Start Now</button>
    </div>
    <img :src="personalized_recommendation" id="personalized_recommendation" :class="{'image-enter-active' : showImage}"/>
  </div>
  
  <div class="model-content">
    <div class="content-text">
      <h2>Recommender Systems</h2>
      <p>Explore feature-rich Recommenders and choose the most suitable one</p>
    </div>
    
    <div class="models">
      <ul>
        <li v-for="model in models" :key="model" @click="pointerModel=model" :class="{'model-pointed' : pointerModel == model}">
          <div class="align-point-model">
            <img :src="point" class="point" :class="{'point-opacity' : pointerModel == model}" width="7px" height="7px" />
            {{ model }}
          </div>
        </li>
      </ul>

      <ModelComponent v-if="pointerModel" :modelName="pointerModel"></ModelComponent>
    </div>
  </div>
  <div class="model-analysis">
    <h3>Model Analysis</h3>
    <ModelDescription type="2" :last="false"/>
    <ModelDescription type="1" :last="true"/>
  </div>
  
  <footer>
    <div>
      <img :src="sun" class="footer-img"/>
      <div class="footer-text">Sunshine Movies</div>
      <div class="footer-contact">
        <div>
          <div class="footer-contact-text">Email</div>
          <div>admin@sunshine.com</div>
        </div>
        <div>
          <div class="footer-contact-text">Phone</div>
          <div>+34 785214963 </div>
        </div>
      </div>
    </div>
      
    <div>
      <div class="footer-text">Get started with personalized movie recommendations</div>
      <button class="footer-btn" @click="login">Try Sunshine Movies</button>
    </div>
  </footer>

  <div class="copyright">
    &copy; {{ currentYear }} Sunshine Movies. All rights reserved.
  </div>
  
</template>

<style scoped>

* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
  position: relative;
  min-height: 100vh;
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

.header {
  position: relative;
  margin: 3% 3%;
  display: flex;
  padding-left: 10%;
  justify-content: center;
  align-items: center;

}

.description {
  width: 32rem;
  padding-top: 2.5rem;
  opacity: 0;
  padding-bottom: 0.625rem;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.4375rem);
  text-align: left;
}

p {
  text-align: justify;
  color: #0f0f0f;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  line-height: 1.5625rem;
}

#personalized_recommendation {
  opacity: 0;
  width: 48rem;
  z-index: -1;
  /* width: 60%; */
}

.image-enter-active {
  animation: 1s slideInImage 0.75s ease-in-out forwards
}

.description-enter-active {
  animation: slideInDescription 1s ease-in-out forwards
}

.button {
  cursor: pointer;
  width: 9rem;
  height: 3rem;
  font-weight: bold;
  border-radius: 50px;
  padding: 0.625rem;
  border: none;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  color: white;
  background-color: rgba(250, 150, 50, 1);
  box-shadow:  0 0 15px rgba(250, 150, 50, 1);
  transition: all 0.3s ease;
  margin-left: 74%;
  margin-top: 5%;
  z-index: 100;
}

.button:hover {
  transform: translateY(-10%);
  background-color: rgba(250, 150, 50, 0.8);
  box-shadow: 0 0 15px rgba(250, 150, 50, 0.8);
}

.model-content {
  background-color: rgba(250, 150, 50, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* margin: 0 3%; */
  padding: 0% 10%;
}

.content-text {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-top: 3rem;
  margin-bottom: 0rem;
}


.models {
  display:flex;
  justify-content: center;
  margin: 0 3%;
  margin-bottom: 3rem;
  /* align-items: center; */
}

ul {
  list-style-type: none;
  padding: 0;
  padding-right: 5rem;
}

.point {
  filter: invert(62%) sepia(66%) saturate(915%) hue-rotate(337deg) brightness(103%) contrast(96%);
  margin-right:0.5rem;
  opacity: 0;
  transition: all 0.3s ease-in-out
}


.align-point-model {
  cursor: pointer;
  display: flex;
  align-items:center;
  
}

li {
  width: 20rem;
  padding: 1.2rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
}

li:hover .point {
  opacity: 1
}

li:hover {
  transform: translateX(20px);
  border-radius: 10px;
  background-color: rgba(250, 150, 50, 0.15);
}

.model-pointed {
  color: rgba(250, 150, 50, 1);
  font-weight: bold;
  transform: translateX(20px);
  border-radius: 10px;
  background-color: rgba(250, 150, 50, 0.15);
}

.point-opacity {
  opacity: 1;
}

.model-analysis {
  margin: 0 3%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
}

h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-top: 3rem;
  margin-left: 2.5rem;
  margin-bottom: 0;

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
  padding-bottom: 0.5rem;
}

.footer-1 {
  display: flex;
  
}

.footer-text {
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  width: 22rem;
  text-align: justify;
}

.footer-contact {
  display: flex;
  width: 20rem;
  justify-content: space-between;
  flex-direction: row;
  font-size: 0.9rem;
}

.footer-contact-text {
  color: rgba(0, 0, 0, 0.6);
  padding-bottom: 0.25rem;
}
.footer-btn {
  cursor: pointer;
  border-radius: 50px;
  width: 10.5rem;
  height: 3rem;
  font-weight: bold;
  /* font-size: 0.75rem; */
  border: none;
  color: white;
  background-color: rgba(250, 150, 50);
  box-shadow: 0 0 10px rgba(250, 150, 50, 1);
  transition: all 0.3s ease-in-out
}

.footer-btn:hover {
  transform: translateY(-10%);
  background-color: rgba(250, 150, 50, 0.8);
  box-shadow: 0 0 10px rgba(250, 150, 50, 0.8);
}

.copyright {
  padding: 2% 13%;
  background-color: rgba(250, 150, 50, 0.5)

}

@keyframes slideInImage {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInDescription {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (max-width: 1200px) {
  .header {
    flex-direction: column;
    align-items: center;
    padding-left: 0;
  }

  .description {
    width: 100%;
    text-align: center;
  }

  #personalized_recommendation {
    width: 100%;
    max-width: 600px;
    margin-top: 2rem;
  }

  .button {
    margin-left: auto;
    margin-right: auto;
  }
}

@media screen and (max-width: 1050px) {
  .models {
    flex-direction: column
  }

  .models {
    align-items: center;
  }
  ul {
    padding-right: 0;
    max-width: 400px
  }
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
