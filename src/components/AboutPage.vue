<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import search from '@/assets/icons/search.png'
import about_recommender from '@/assets/images/about_recommender.png'
import commitment from '@/assets/images/commitment.png'

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

  <body>
    <div class="about-1">
      <div class="about-recommenders">
        <h1 class="title">About Recommender Systems</h1>
        <div class="text">
          At Sunshine Movies, we are committed to enhancing your experience with our cutting-edge recommendation technologies. We tailor our 
          recommendations to suit yout unique preferences, and you can choose the most suitable and personalised option according to your preferences.
        </div>
        <ul>
          <li>
             <b>Popularity-based recommender system:</b> Suggests movies based on their overall popularity and average ratings across all users. This method does not consider individual users
            preferences but instead focuses on recommending the most highest-rated movies. This system is highly effective for new users who haven't provided any ratings yet.
            <br/><br/>
            <i> Example: Suggesting "The Shawshank Redemption" or 'Sponge Bob' because these movies have consistently high ratings and are popular among all users. </i> 
          </li>
          <li>
            <b>Similarity-based recommender system:</b> Predicts user preferences by identifying movies that are similar to those the user liked in the past.
            <br/><br/>
            <i> Example: Recommending a movie that users with similar profile have highly rated.</i>
          </li>
          <li>
            <b>Matrix Factorization based recommender system:</b> A powerful technique that works by descomposing the large matrix of user-item interactions into lower-dimensional
            matrices that represent latent factors for users and items.
            <br/><br/>
            <i> Example: Using techniques such as Singular Value Descomposition (SVD) to predict that a user who likes science fiction and action movies might enjoy "The Avengers", 
              even if he has not rated it before.
            </i>
          </li>
          <li>
            <b>Neuronal Network based recommender system:</b> Levarages Deep Learning techniques to model complex interactions between users and items. These systems can incorporate
            a wide variety of inputs, including user behavior or item features to provide highly personalized recommendations.
            <br/><br/>
            <i>Example: Using a deep neuronal network to recommend movies by learning a combination of user and item features, thereby suggesting a movie like "The Matrix" to a user
              who frequently watches science fiction and philosophical movies.
            </i>
          </li>
        </ul>      
      </div>
      <img :src="about_recommender" class="img"/>
      
    </div>
    <div class="about-2">
      <img :src="commitment" class="img-2"/>
      <div>
        <h1>Commitment</h1>
        <div>At Sunshine Movies, we strive to offer you a personalized and enjoyable browsing experience. Our advanced recommender systems are designed to provide you with relevant, 
          diverse, and contextually appropriate movie suggestions. Explore our platform and discover how we tailor content to fit your unique preferences.
        </div>
      </div>

      
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
    margin: 5% 3%;
    padding: 0 6.5%;
}

.about-1 {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-bottom: 4rem;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.img {
    /* margin-top: 2rem; */
    width: 45%;
    height: 50rem;
}

.about-recommenders {
    margin-right: 1.5rem;
}

.text {
    text-align: justify
}

ul {
  list-style:circle;
}

li {
  padding: 1rem 0;
  padding-right: 1rem;
  text-align: justify;
  line-height: 1.5rem;
}

.about-2 {
  display: flex;
  align-items: center;
  text-align: justify;
  line-height: 1.5rem;
}

.img-2 {
  border-radius: 50px;
  width: 50%;
  margin-top: 5rem;
  margin-right: 3rem;
}

footer {
  margin: 0 3%;
  padding: 2% 10%;
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
    width: 15rem;
    display: flex;
    justify-content: space-between;
}

</style>