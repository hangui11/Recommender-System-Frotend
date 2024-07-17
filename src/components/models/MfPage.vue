<script setup>
import NavContainer from '../NavContainer.vue';
import mf_based from '@/assets/images/mf_based.png'
const currentYear = new Date().getFullYear()
</script>


<template>
    <NavContainer/>
    <div class="body">
        <h1>Matrix Factorization based Recommender</h1>
        <p>A Matrix Factorization based recommender system is a powerful and sophisticated method used to provide personalized recommendations. This technique involves descomposing a 
            large matrix of user-item interactions (eg., ratings) into lower-dimensional matrices that represent latent factors for users and items. These latent factors capture hidden
            characteristics or features that explain the observed interactions. The primary goal of matrix factorization is to predict missing values in the user-item interaction matrix,
            thereby enabling the system to recommend items that a user is likely to prefer.
        </p>

        <img :src="mf_based"/>

        <div>
            <p><b>How It Works</b></p>
            <p>The core principal behind matrix factorization is descomposing a large matrix of user-item interactions into two lower-dimensional matrices. Here's how it operates: </p>
            <ul class="steps">
                <li>
                    <b>User-Item Interaction Matrix: </b> The starting point is a matrix where rows represent users, columns represent items, and the values in the matrix represent interactions
                    (such as ratings or implicit feedback).
                </li>
                <li>
                    <b>Descomposition: </b> The matrix is descomposed into two lower-dimensional matrices:
                    <ul>
                        <li>
                            <b>User Matrix (U): </b> Each row represents a user, and each column represents a latent factor.
                        </li>
                        <li>
                            <b>Item Matrix (V): </b> Each row represents an item, and each column represents a latent factor.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Latent Factors: </b> These are hidden features that can capture complex user preferences and item characteristics.
                </li>
                <li>
                    <b>Reconstruction: </b> The original matrix is approximated by the product of the user and item matrices. The missing values (i.e., ratings or interactions that have not yet
                    ocurred) are predicted based on this approximation.
                </li>
                <li>
                    <b>Optimization: </b> The matrices are learned through optimization techniques such as stochastic gradient descent or alternating least squares, minimizing the difference between
                    the observed interactions and the reconstructed values.
                </li>
                <li>
                    <b>Prediction: </b> Once the matrices are trained, the system can predict the missing values in the original matrix. These predictions are used to generate personalized recommendations. 
                </li>
            </ul>
        </div>

        <div>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Accuracy: </b> Matrix factorization models are known for their high accuracy in capturing user preferences and predicting ratings.
                </li>
                
                <li>
                    <b>Scalability: </b> These models can handle large datasets efficiently, making them suitable for systems with many users and items.
                </li>

                <li>
                    <b>Latent Features: </b> By uncovering latent features, matrix factorization can provide insights into user preferences and item 
                    characteristics that are not explicitly available.
                </li>

            </ul>
        </div>
        
        <div>
            <p>However, there are some limitations to this approach: </p>
            <ul>
                <li>
                    <b>Sparsity: </b> User-item interaction matrices are opten sparse, meaning most entires are missing. While matrix factorization can predict these values,
                    extremely sparse data can still pose challenges.
                </li>
                
                <li>
                    <b>Complexity: </b> Training matrix factorization models can be computationally intensive and require careful tuning of hyperparameters and regularization
                    techniques to prevent overfitting.
                </li>

                <li>
                    <b>Dynamic Preferences: </b> User preferences can change over time, and static matrix factorization models may not adapt quickly to these changes. Online learning
                    techniques or periodic retraining are required to address this issue.
                </li>
            </ul>
        </div>

        <p>
            Matrix factorization is a robust and widely used technique in recommender systems, offering high accuracy and scalability. By leveraging latent factors, it can unconver
            hidden patterns in user behavior and item characteristics, providing personalized recommendations. However, it also comes with challenges such as handling sparse data,
            addressing cold start issues, and maintaing model interpretability. Combining matrix factorization with other methods and regularly updating the model can help mitigate
            these disavantages, ensuring an effective recommendation system.
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