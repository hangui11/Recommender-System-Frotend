<script setup>
import NavContainer from '../NavContainer.vue';
import user_based from '@/assets/images/user_based.png'
const currentYear = new Date().getFullYear()

</script>


<template>
    <NavContainer/>
    <div class="body">
        <h1>User-to-User based Recommender</h1>
        <p>A user-to-user based recommender system, also known as collaborative filtering, is a sophisticated method designed to offer personalised movie recommendations by leveraging
            the preferences and tastes of similar users. This system identifies users with similar viewing patterns and preferences, then is able to suggest movies that these similar
            users have rated positively but that the target user has not yet rated. Also it is worth noting that it is very similar to the item-to-item technique.
        </p>

        <img :src="user_based"/>

        <div>
            <p><b>How It Works</b></p>
            <p>The core principal behind user-to-user collaborative filtering is the identification of user similarity, often referred to as 'neighbor users'. Here's how it operates: </p>
            <ul class="steps">
                <li>
                    <b>Data Collection: </b> The system collects and analyzes user behavior data, such as movie ratings, watch history, and other interactions.
                </li>
                <li>
                    <b>Similarity Calculation: </b> Using similarity metrics like Pearson correlation, the system calculates the degree of similarity between users based on their movies
                    ratings and preferences.
                </li>
                <li>
                    <b>Neighbor Selection: </b> The system identifies a set of users (neighbors) who have the highest similarity scores with the target user.
                </li>
                <li>
                    <b>Recommendation Generation: </b> Movies that haven been rated highly by these similar users but have not been rated by the target user are recommended. The
                    assumption is that if users with similar tastes enjoyed these movies, the target one will likely enjoy them too.
                </li>
            </ul>
        </div>

        <div>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Personalization: </b> Provides highly personalized recommendations by focusing on the tastes and preferences of similar users.
                </li>
                
                <li>
                    <b>Domain Independence: </b> No in-depth knowledge of item features or content is needed, as the system uses user similarity to make suggestions.
                </li>

                <li>
                    <b>Discovery: </b> Helps users discover movies that they might not have found on their own, based on the positive experiences of like-minded viewers. 
                </li>

            </ul>
        </div>
        
        <div>
            <p>However, there are some limitations to this approach: </p>
            <ul>
                <li>
                    <b>Cold Start Problem: </b> New users with no rating history can be difficult to provide accurate recommendations for, as there is insufficient data to find similar users.
                </li>
                
                <li>
                    <b>Data Sparsity: </b> With a large number of movies, many user might have only rated a small fraction, making it challenging to find significant overlaps in preferences.
                </li>

                <li>
                    <b>Scalability: </b> Calculating similarities and generating recommendations can be computationally intensive as the number of users and items increases.
                </li>
            </ul>
        </div>

        <p>
            User-to-user based recommender systems play a crucial role in offering personalised content to users by harnessing the power of collaborative filtering. By undestanding and
            leveraging the preferences of like-minded individuals, these systems improve user satisfaction and commitment, making them indispensable tools to build a personalized recommender.
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
    max-width: 50%;
}

.steps {
    list-style: decimal;
}

</style>