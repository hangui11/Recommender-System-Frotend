<script setup>
import { defineProps } from 'vue'
import ModelChartBar from '@/components/ModelChartBar.vue'
const props = defineProps({
    type: {
        type: String,
        required: true
    },
    last: {
      type: Boolean,
      required: true
    }
    
});


const isLast = () => {
  return ! props.last
}
</script>

<template>
    <div v-if="props.type === '1'" class="model-chart" :class="{'model-chart-line' : isLast()}">
      
      <div class="execution-time-text">
        <div id="model-chart-title">Computation Time</div>
        <div class="text">
          Take a look the comparative analysis of computation time across various models. This detailed observation reveals the distinct performance characteristics
          and behavioral patterns of each model using the previous dataset registred.
        </div>
        <ul>
            <li>The trivial model functions as a non-personalized recommender, resulting in exceptionally fast computation times due to its simplicity.</li>
            <li>Collaborative Filtering leverages user-item interactions to predict movie suggestions. The computation time varies depending on the specific algorithm and techniques employed.</li>
            <li>Models using Machine Learning and Deep Learning methods exhibits high computational complexity, requiring meticulous training process to obtain optimal performance.</li>
        </ul>
      </div>
      <ModelChartBar type = '1' title='Computation time of Models' yLabel="Time (seconds)" class="execution-chart"></ModelChartBar>
    </div>


    <div v-else class="model-chart" :class="{'model-chart-line' : isLast()}">
      <ModelChartBar type = '2' title='Model Accuracy' yLabel="Accuracy (%)" class="execution-chart"></ModelChartBar>
      <div class="accuracy-text">
        <div id="model-chart-title">Model Accuracy</div>
        <div class="text">
          Examine the comparative analysis of accuracy across various models. The evaluation metric used determines the optimal model for each user based on the highest similarity
          between predicted movie recommendations and the movies that they have rated.
        </div>
        <ul>
            <li>Item-based model: Recommends movies by analyzing the features and characteristics of the items themselves.</li>
            <li>User-based model: Makes recommendations by analyzing the behaviors and preferences of users.</li>
            <li>Hybrid model: Combines both item-based and user-based approaches to make recommendations by utilizing the feature of both items and users.</li>
        </ul>
      </div>
      
    </div>

</template>

<style scoped>
.model-chart {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  
}

.model-chart-line {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2)
}

.execution-time-text {
  width: 40rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 3.5rem;
  text-align: justify;
}

.accuracy-text {
  width: 40rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 3.5rem;
  text-align: justify;
}

.text {
    font-size: 1rem;
    line-height: 1.5rem;
    color: gray;
}

#model-chart-title {
  font-size: 2rem;
  font-weight: bold;
  padding: 1.5rem 0;
}

ul {
    list-style: circle
}

li {
    padding: 1rem 0;
    padding-right: 2rem;
}

li::marker {
    color: rgba(250, 150, 50, 1);
}

</style>