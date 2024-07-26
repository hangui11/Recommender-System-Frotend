<!-- Dashboard.vue -->
<script setup>
import { getCurrentUser } from '@/lib/appwrite';
import { onMounted, onUnmounted, ref } from 'vue';
// import { useRouter } from 'vue-router';
import DashboardContainer from './DashboardContainer.vue';
import chevron_down from '@/assets/icons/chevron_down.svg'
import chevron_up from '@/assets/icons/chevron_up.svg'

// const router = useRouter()
const username = ref('')
const user_avatar = ref('')
const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']


const selectedModel = ref(models[0])
const isExpanded = ref(false)
const start = ref(false)
const modelsContainer = ref(null)

const handleClickOutside = (event) => {
  if (modelsContainer.value && !modelsContainer.value.contains(event.target)) {
    isExpanded.value = false
  }
}


onMounted( async () => {
  try {
    const current_user = await getCurrentUser()
    username.value = current_user.username
    user_avatar.value = current_user.avatar
  } catch (error) {
    alert('Do not have user logged')
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})


const modelSelect = (model) => {
  selectedModel.value = model
  isExpanded.value = false
}


</script>




<template>
  <div>
    <DashboardContainer :avatar="user_avatar" :username="username"/>
    <div class="body">
      <h1 >Welcome, {{ username }} 🤗!</h1>
      <p>Please select the model for which you would like to receive recommendations:</p>
      <div class="" >
        <div class="combobox" ref="modelsContainer">
          <div class="model-name" @click="isExpanded = !isExpanded; start=true">{{ selectedModel }}</div>
          <img class="arrow" :src="isExpanded ? chevron_up : chevron_down"  @click="isExpanded = !isExpanded; start=true"/>
          <div class="models-box" v-if="start" :class="{'models-active' : isExpanded, 'models-inactive': !isExpanded}">
            <ul>
              <li v-for="model in models" :key="model" :value="model" :class="{'model-selected' : model === selectedModel}" @click="modelSelect(model)"> {{ model }}</li>
            </ul>
          </div>
        
        </div>
        <button>BUTTON</button>
      </div>
      
    </div>
    
  </div>
</template>


<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.body {
  position: relative;
  margin: 3% 6%; 
}

p {
  font-size: large;
  font-weight: 500;
}


.combobox {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 5px;
  height: 3.5rem;
  width: 44%;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  padding-inline: 1.5rem;
  border-bottom: 2px solid;
  margin-top: 1rem;
}

.arrow {
    width: 2rem;
}

.models-box {
  position: absolute;
  left: 0%;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0,0.2);
  width: 100%; 
  background-color: white;
  transition: all 0.3s ease-in-out;
  opacity: 0;
}

.model-name {
  width: 95%;
  font-size:larger;
  font-style: normal;
  font-weight: 400;
}
.models-active {
  animation: models-enter 0.2s ease-in-out forwards;
}

.models-inactive {
  animation: models-leave 0.2s ease-in-out forwards;
}

ul {
  list-style: none;
  padding: 0;
  font-size: larger;
  margin: 0;
}

li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  cursor: pointer;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.model-selected {
  background-color: rgba(0, 0, 0, 0.2);
}

button {
  cursor: pointer;
  margin-top: 1.5rem;
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  font-size: medium;
  padding: 0.5rem 2rem;
  z-index: -1;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

@keyframes models-enter {
  from {
    top: -135%;
    transform: scaleY(0.1);
    opacity: 0;
  }
  to {
    top: 106%;
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes models-leave {
  from {
    top: 106%;
    transform: scaleY(1);
    opacity: 1;
  }
  to {
    top: -135%;
    transform: scaleY(0.1);
    opacity: 0;
  }
  
}
</style>