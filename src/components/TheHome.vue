<script setup>

import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

import sun from '@/assets/icons/sun.svg'
import point from '@/assets/icons/point.svg'

import personalized_recommendation from '@/assets/images/personalized-recommendations.png'
import ModelComponent from '@/components/ModelComponent.vue'
import ModelDescription from '@/components/ModelDescription.vue'
import NavContainer from '@/components/NavContainer.vue'
import { existCurrentUser } from '@/lib/appwrite'

const router = useRouter()

const login = async () => {
  const existUser = await existCurrentUser()
  if (existUser) router.push('/dashboard')
  else router.push('/login')
}

const sign_up = () => {
  router.push('/sign_up')
  // window.location.href = 'https://www.youtube.com/watch?v=Mhy5_DpSDhM';
  // window.open(url, '_blank'); // '_blank' indica abrir en una nueva pestaña
}


let showImage = ref(false)
let pointerModel = ref('Trivial');

const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']
const currentYear = new Date().getFullYear()

onMounted(() => {
  showImage.value = true
})

onUnmounted(() => {
  showImage.value = false
})

</script>

<template>
  <NavContainer/>

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
