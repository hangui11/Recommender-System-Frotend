<script setup>
import { defineProps } from 'vue';
import trivial from '@/assets/trivial.jpg'

const models = ['Trivial', 'User-to-User', 'Item-to-Item', 'Matrix Factorization', 'K-Nearest-Neighbor', 'Neuronal Collaborative Filtering']

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

</script>


<template>
    <div v-if="checkProps()">
        <div v-if="props.modelName==models[0]" class="trivial">
            <img :src="trivial" class="img"/>
            <div class="text-content">
                <div class="text-title">RECOMMENDER BASED ON TRIVIAL MODEL</div>
                <!-- <div>This recommender suggest movies based on evaluation of movies rated by users.</div> -->
            </div>
            
        </div>
    </div>
</template>


<style scoped>
.trivial {
    padding-top: 1rem;
    padding-left: 5rem;
    /* align-items: center */
}

.img {
    width: 40rem;
    height: 13rem
}

.text-content {
    /* padding-right: 21rem; */
}

.text-title {
    font-weight: bold;
    margin-top: 1rem;
    color: rgba(250, 150, 50, 1)
}
</style>