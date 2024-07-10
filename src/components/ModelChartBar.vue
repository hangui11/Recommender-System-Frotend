<script setup>
import { ref, defineProps, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { modelInformation } from '@/assets/data/chart'


const props = defineProps({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    yLabel: {
        type: String,
        required: true
    }
});

const chartContainer = ref(null)
const chartVisible = ref(false)

onMounted( () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                chartVisible.value = true
            }
        })
    })
    if (chartContainer.value) {
        setTimeout(() => {
            observer.observe(chartContainer.value)
        }, '10')
        
  }
})

const labels = modelInformation.map(item => item.name)
const executionTime = modelInformation.map(item => item.time)
const accuracy = modelInformation.map(item => item.accuracy)


ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const charDataTime = ref({
  labels: labels,
  datasets: [
    {
      backgroundColor: ['red', 'green', 'green', 'green', 'blue', 'blue'],
      borderWidth: 1,
      data: executionTime,
    //   barThickness: 80
    }
  ]
})

const charDataAccuracy = ref({
  labels: labels,
  datasets: [
    {
      backgroundColor: ['red', 'green', 'red', 'blue', 'blue', 'blue'],
      borderWidth: 1,
      data: accuracy,
    //   barThickness: 80
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        generateLabels: function() {
          return [
            {
              text: props.type === '1' ? 'Non-personalized' : 'Item-based model',
              fillStyle: 'red',
            },
            {
              text: props.type === '1' ? 'Collaborative Filtering' : 'User-based model',
              fillStyle: 'green'
            },
            {
              text: props.type === '1' ? 'Machine Learning' : 'Hybrid model',
              fillStyle: 'blue'
            }
          ];
        }
      }
    },
    title: {
      display: true,
      text: props.title,
      font: {
        size: 30,
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: props.yLabel,
        font: {
          size: 20
        }
      }
    },
    x: {
      title: {
        display: true,
        text: 'Model',
        font: {
          size: 20
        }
      },
      
    }
  }
})

</script>

<template>
    <div class="chart-container" ref="chartContainer">
        <Bar v-if="props.type === '1' && chartVisible" :data="charDataTime" :options="chartOptions"></Bar>
        <Bar v-if="props.type === '2' && chartVisible" :data="charDataAccuracy" :options="chartOptions"></Bar>
    </div>
</template>

<style scoped>

.chart-container {
    /* margin-top: 5rem; */
    width: 40rem;
    max-width: 40rem;
    height: 30rem;
    padding: 1rem 0;
    padding-left: 1rem;
    padding-right: 3rem;
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2)
}

</style>
