<script setup>
import NavContainer from '../NavContainer.vue';
import popularity_based from '@/assets/images/popularity_based.png'
const currentYear = new Date().getFullYear()

</script>


<template>
    <NavContainer/>
    <div class="body">
        <h1>Popularity-based Recommender</h1>
        <p>In other words, a popularity-based recommender system is a non-personalized recommender system that offers the same movie predictions to all users. This method
            does not take into account individual user preferences but instead relies on the general popularity of items across the entire user bse. The recommendations are
            typically based on metrics such as the average rating, number of ratings, or overall views of each film.
        </p>
        <div>
            <img :src="popularity_based"/>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Simplicity: </b> The algorithm is straightforward to implement and computationally efficient. It does not require complex calculations or user-specific
                    data, making it a quick and easy solution for generating recommendations.
                </li>
                
                <li>
                    <b>Scability: </b> Because the recommendations are based on overall popularity, the system can easily scale to accommodate a large number of users and items
                    without a significant increase in computational resources.
                </li>

                <li>
                    <b>Cold Start Problem: </b> It is particulary effective for addressing the cold start problem, which occurs when new users have not yet provided any ratings
                    or interactions. Since the system relies on aggregate data, it can immediately offer recommendations to new users without needing any prior information about
                    their preferences.
                </li>

            </ul>
        </div>
        
        <div>
            <p>However, there are some limitations to this approach: </p>
            <ul>
                <li>
                    <b>Lack of Personalization: </b> Since the recommendations are the same for all users. the system cannot attend to individual tastes or preferences. This can lead
                    to a suboptimal user experience for those who have unique interests.
                </li>
                
                <li>
                    <b>Stagnation: </b> The system might consistently recommend the same set of popular items, leading to a lack of diversity in the recommendations. Users may miss out
                    on discovering lesser-known or emerging films that align more closely with their personal preferences.
                </li>

                <li>
                    <b>Trend Dependency: </b> Popularity-based systems might overly focus on current trends, potentially neglecting classic or order movies that might still be of interest
                    to users.
                </li>
            </ul>
        </div>

        <p>
            Despite these limitations, a popularity-based recommender system serves as a valuable tool, especially in scenarios where user data is sparse or for new users who are just starting
            to explore the platform. It provides a solid foundation upon which more personalized recommendation systems can be built as more user-specific data becomes avaiable.
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
    margin: 3rem 1rem;
    max-width: 50%;
}

</style>