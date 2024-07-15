<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

import  right_arrow  from '@/assets/icons/right_arrow.svg'

import trivial from '@/assets/images/trivial.jpg'
import user from '@/assets/images/user.png'
import item from '@/assets/images/item.png'
import mf from '@/assets/images/mf.png'
import knn from '@/assets/images/knn.jpg'
import ncf from '@/assets/images/ncf.png'

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
    router.push(`/models/${model}`)
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

        <div v-else-if="props.modelName==models[1]" class="model">
            <img :src="user" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON USER-TO-USER MODEL</div>
                <div class="text"> The user-based recommender system suggests movies by identifying similarities between users. It recommends movies that have been positively
                    rated by users with similar preferences.
                </div>
            </div>
        </div> 

        <div v-else-if="props.modelName==models[2]" class="model">
            <img :src="item" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON ITEM-TO-ITEM MODEL</div>
                <div class="text"> The item-based recommender system suggests movies by analyzing the similarities between items. It recommends movies that the user has not yet
                    rated but share similar features with the movies that the user has previously rated highly.
                </div>
            </div>
        </div>

        <div v-else-if="props.modelName==models[3]" class="model">
            <img :src="mf" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON MATRIX FACTORIZATION MODEL</div>
                <div class="text"> The matrix factorization based recommender system utilizes the interaction between users' and items' features to suggest movies to users. It employs
                    machine learning algorithms to offer personalized recommendation.
                </div>
            </div>
        </div>

        <div v-else-if="props.modelName==models[4]" class="model">
            <img :src="knn" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON K-NEAREST NEIGHBOR MODEL</div>
                <div class="text"> The KNN model is a supervised learning algorithm that classifies a new data based on the closest data categories in the feature space. It suggests movies
                    similar to those in categories that have been positively rated.
                </div>
            </div>
        </div>

        <div v-else-if="props.modelName==models[5]" class="model">
            <img :src="ncf" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON NEURONAL COLLABORATIVE FILTERING MODEL</div>
                <div class="text"> The NCF model leverages deep learning techniques, specifically neuronal networks. It captures complex user-item interactions
                    to predict and suggest personalized movies.
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
    animation: showModel 0.5s ease-in forwards;
    padding-top: 1rem;
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
    line-height: 1.5rem;
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
    transform: translateY(-10%);
    background-color: rgba(250, 150, 50, 0.8);
    box-shadow: 0 0 15px rgba(250, 150, 50, 0.8);
}


.arrow {
    padding-left: 0.5rem;
    filter: brightness(0) saturate(100%) invert(99%) sepia(6%) saturate(385%) hue-rotate(327deg) brightness(119%) contrast(100%);
    width: 1.3rem;
    height: 1.3rem;
}

@keyframes showModel {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>