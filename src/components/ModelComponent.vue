<script setup>
import { defineProps } from 'vue';
import trivial from '@/assets/trivial.jpg'
import user from '@/assets/user.png'
import { useRouter } from 'vue-router';
import  right_arrow  from '@/assets/right_arrow.svg'

const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    modelName: {
        type: String,
        required: true
    },
});


const checkProps = () => {
    if (! props.modelName) {
        alert("Error: modelName is required");
        return false
    }
    else return true
}

const goToModel = (model)  => {
    model = model.toLowerCase()
    router.push(`./${model}`)
}
// const seedValue = Math.random()
</script>


<template>
    <div v-if="checkProps()">
        <div v-if="props.modelName==models[0]" class="model">
            <img :src="trivial" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON TRIVIAL MODEL</div>
                <div class="text">The trivial recommender system suggests movies based on the aggregated evaluations of all users' ratings.
                    It is a non-personalized approach, focusing on identifying and recommending movies that are currently trending and have received high ratings.
                </div>
            </div>
        </div> 

        <div v-if="props.modelName==models[1]" class="model">
            <img :src="user" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON USER-TO-USER MODEL</div>
                <div class="text">
                </div>
            </div>
        </div> 

        <div class="btn">
            <button type="button" @click="goToModel(props.modelName)">
                Explore More
                <img :src="right_arrow" class="arrow"/>
            </button>
        </div>

            
        <!-- <img :src="`https://api.dicebear.com/9.x/adventurer/svg?seed=${seedValue}`" /> -->
    </div>
</template>


<style scoped>
.model {
    padding-top: 1rem;
    padding-left: 3rem;
    
    /* align-items: center */
}

.img {
    width: 40rem;
    height: 15rem
}

.text-content {
    width: 40rem;
    text-align: justify;
    margin-bottom: 1.6rem;
}

.text-title {
    font-weight: bold;
    margin-top: 1rem;
    color: rgba(250, 150, 50, 1);
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
}

.text {
    font-size: 1rem;
}

button {
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    border-radius: 50px;
    width: 10rem;
    height: 3rem;
    border: none;
    color: white;
    background-color: rgba(250, 150, 50, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(250, 150, 50, 1);
    transition: all 0.3s ease-in-out
}

button:hover {
    transform: translateY(-5%);
    background-color: rgba(250, 150, 50, 0.8);
}

.btn {
    padding-left: 3rem;
}

.arrow {
    padding-left: 0.5rem;
    filter: brightness(0) saturate(100%) invert(99%) sepia(6%) saturate(385%) hue-rotate(327deg) brightness(119%) contrast(100%);
    width: 1.3rem;
    height: 1.3rem;
}
</style>