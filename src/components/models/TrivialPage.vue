<script setup>
import NavContainer from '../NavContainer.vue';
const currentYear = new Date().getFullYear()

</script>


<template>
    <NavContainer/>
    <body>
        <h1>Popularity-based Recommender</h1>
        <p>In other words, a popularity-based recommender system is a non-personalized recommender system that offers the same movie predictions to all users. This method
            does not take into account individual user preferences but instead relies on the general popularity of items across the entire user bse. The recommendations are
            typically based on metrics such as the average rating, number of ratings, or overall views of each film.
        </p>
        <div>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Simplicity: </b> The algorithm is straightforward to implement and computationally efficient. It does not require complex calculations or user-specific
                    data, making it a quick and easy solution for generating recommendations.
                </li>
                <li>
                    <b>Scability: </b> 
                </li>
            </ul>
        </div>
        
    </body>
    <div class="copyright">
        &copy; {{ currentYear }} Sunshine Movies. All rights reserved.
    </div>
</template>

<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

body {
    margin: 5% 3%;
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
  padding: 0.25rem 0;
  padding-right: 1rem;
  text-align: justify;
  line-height: 1.5rem;
}

</style>