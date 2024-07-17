<script setup>
import NavContainer from '../NavContainer.vue';
import knn_based from '@/assets/images/knn_based.png'
const currentYear = new Date().getFullYear()
</script>


<template>
    <NavContainer/>
    <div class="body">
        <h1>NCF based Recommender</h1>
        <p>Neuronal Collaborative Filtering is an advanced recommendation system that leverages deep learning techniques to model complex user-item interactions. Unlike traditional 
            collaborative filtering methods that rely on matrix factorization or nearest neighbors, NCF uses neuronal networks to captura non linear relationships and high-order
            interactions between users and items. This approach allows for more accurate and personalized recommendations, especially in scenarios with complex and sparse data.
        </p>

        <img :src="knn_based"/>

        <div>
            <p><b>How It Works</b></p>
            <p>The core principal behind NCF is using neuronal networks to capture user-item interactions, then compute the predictions. Here's how it operates: </p>
            <ul class="steps">
                <li>
                    <b>Input Representation: </b>
                    <ul>
                        <li>
                            <b>User Embeddings: </b> Each user is represented by a dense vector, often initialized randomly and learned through training.
                        </li>
                        <li>
                            <b>Item Embeddings: </b> Similarly, each item is represented by a dense vector, initialized and learned in the same manner as user embeddings.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Model Architecture: </b> 
                    <ul>
                        <li>
                            <b>Embedding Layers: </b> User and item embeddings are created through embedding layers that transform sparse user/item IDs into dense vectors.
                        </li>
                        <li>
                            <b>Interaction Layers: </b> The core of the NCF model involves combining user and item embeddings to capture their interactions. The architecture used is
                            <i>Multi-Layer-Perceptron (MLP)</i>, a series of fully connected layers that learn high-prder interactions between users and items.
                            
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Prediction: </b> The combined embeddings from MLP are passed through final dense layers to produce a prediction score, which represents the likelihood of a user
                    interactiong with an item.
                </li>
                <li>
                    <b>Recommendation Genration: </b> The hybrid system generates a list of recommended items for the user by combining the outputs from the collaborative components,
                    ensuring that the recommendations are relevant and personalised.
                </li>
                <li>
                    <b>Feedback Loop: </b> The system continuously updates its models based on new user interactions, improving the accuracy of future recommendations.
                </li>
            </ul>
        </div>

        <div>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Improved Accuracy: </b> By combining CF components, the hybrid system can provide more accurate recommendations, leveraging the strengths of both methods.
                </li>
                
                <li>
                    <b>Reduced Sparsity: </b> The integration of multiple data sources helps to mitigate the sparsity issue common in collaborative filtering systems, improving the
                    robustness of recommendations.
                </li>

                <li>
                    <b>Flexibility: </b> KNN hybrid recommenders can be easily adapted to different types of data and domains, making them versatile for various applications.
                </li>

            </ul>
        </div>
        
        <div>
            <p>However, there are some limitations to this approach: </p>
            <ul>
                <li>
                    <b>Computational Complexity: </b> Calculating similaries and combining predictions from multiple sources can be computationally intensive, especially for large datasets.
                </li>
                
                <li>
                    <b>Parameter Tuning: </b> The hybrid system requires careful tuning of parameters such as the number of neighbors (k) for combining CF predictions, which can be complex
                    and time-consuming.
                </li>

                <li>
                    <b>Scalability Issues: </b> KNN-based methods may struggle to scale efficiently with increasing numbers of users and items, potentially requiring additional optimization
                    or approximation.
                </li>
            </ul>
        </div>

        <p>
           KNN hybrid based recommender system is a sophisticated approach that enhances recommendation accuracy and robustness by combining collaborative filtering techniques. While it offers
            significant advantages such as improved accuracy, cold start mitigation, and enhanced diversity, it also presents challenges in terms of computational complexity, scalability, and
            parameter tuning. When implemented effectively, a KNN hybrid recommender can provide highly personalized and diverse recommendations, making it a valuable tool.
        </p>
    </div>
    <div class="copyright">
        &copy; {{ currentYear }} Sunshine Movies. All rights reserved.
    </div>
</template>

<style scoped>
* {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.body {
    margin: 3% 3%;
    padding: 0 6.5%;
}

.copyright {
  padding: 2% 13%;
  background-color: rgba(250, 150, 50, 0.5)
}

h1 {
    color: rgba(250, 150, 50, 0.8)
}

p {
    text-align: justify;
    line-height: 1.5rem;
}

li {
  padding: 0.6rem 0;
  padding-right: 1.5rem;
  text-align: justify;
  line-height: 1.5rem;
}

img {
    float: right;
    margin: 2rem 0rem;
    margin-left: 2rem;
    max-width: 50rem;
}

.steps {
    list-style: decimal;
}

</style>