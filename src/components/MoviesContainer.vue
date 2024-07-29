<script setup>
import { ref, computed, onMounted } from 'vue';

import arrow_next from '@/assets/icons/arrow_next.svg'
import arrow_prev from '@/assets/icons/arrow_prev.svg'
const currentSlide = ref(0)
const slideWidth = ref(150 + 2 * 16)
const containerWidth = ref(0)
const slideToMove = 2 // Number of slides to move on each click

const props = defineProps({
    movies: {
        type: Array,
        required: true
    }
})

onMounted(() => {
  containerWidth.value = document.querySelector('.movies-container').offsetWidth
})

const maxSlide = computed(() => {
  const visibleSlides = Math.floor(containerWidth.value / slideWidth.value)
  return props.movies.length - visibleSlides
})

const nextSlide = () => {
  // console.log(currentSlide.value)
  // console.log(maxSlide.value)
  if (currentSlide.value < maxSlide.value - 1) currentSlide.value += slideToMove
  else currentSlide.value = maxSlide.value
}

const prevSlide = () => {
  if (currentSlide.value > 0) currentSlide.value -= slideToMove
  else currentSlide.value = 0
}
</script>


<template>
    <div class="latestMovies">
      <img :src="arrow_prev" class="arrow" @click="prevSlide"/>
      <div class="movies-container" >
        <div class="movies" :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }">
          <div v-for="movie in props.movies" :key="movie" :value="movie" class="movie">
            <img :src="movie.image_url" class="movie-image"/>
            <div>{{ movie.title }}</div>
          </div>
        </div>
        
      </div>
      <img :src="arrow_next" class="arrow" @click="nextSlide"/>
    </div>
</template>


<style scoped>
.latestMovies {
  margin: 1% 6%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.movies-container {
  overflow: hidden;
  width: 80%;
  display: flex;
  /* justify-content: center; */
}

.movies {
  display: flex;
  transition: all 0.3s ease-in-out;
}

.movie {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  transform: scale(0.9);
}

.movie:hover {
  transform: scale(1);
}

.movie-image {
  width: 150px;
  height: 210px;
}

.arrow {
    height: 2rem;
    width: 2rem;
    cursor: pointer;
}
</style>