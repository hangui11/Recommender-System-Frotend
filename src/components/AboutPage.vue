<script setup>
import sun from '@/assets/icons/sun.svg'
import about_recommender from '@/assets/images/about_recommender.png'
import commitment from '@/assets/images/commitment.png'
import NavContainer from '@/components/NavContainer.vue'

const currentYear = new Date().getFullYear()

</script>

<template>
  <NavContainer/>

  <div class="body">
    <div class="about-1">
      <div class="about-recommenders">
        <h1 class="title">About Recommender Systems</h1>
        <div class="text">
          At Sunshine Movies, we are committed to enhancing your experience with our cutting-edge recommendation technologies. We tailor our 
          recommendations to suit yout unique preferences, and you can choose the most suitable and personalised option according to your preferences.
        </div>
        <ul>
          <li>
             <b>Popularity-based recommender system:</b> Suggests movies based on their overall popularity and average ratings across all users. This method does not consider individual users
            preferences but instead focuses on recommending the most highest-rated movies. This system is highly effective for new users who haven't provided any ratings yet.
            <br/><br/>
            <i> Example: Suggesting "The Shawshank Redemption" or 'Sponge Bob' because these movies have consistently high ratings and are popular among all users. </i> 
          </li>
          <li>
            <b>Similarity-based recommender system:</b> Predicts user preferences by identifying movies that are similar to those the user liked in the past.
            <br/><br/>
            <i> Example: Recommending a movie that users with similar profile have highly rated.</i>
          </li>
          <li>
            <b>Matrix Factorization based recommender system:</b> A powerful technique that works by descomposing the large matrix of user-item interactions into lower-dimensional
            matrices that represent latent factors for users and items.
            <br/><br/>
            <i> Example: Using techniques such as Singular Value Descomposition (SVD) to predict that a user who likes science fiction and action movies might enjoy "The Avengers", 
              even if he has not rated it before.
            </i>
          </li>
          <li>
            <b>Neuronal Network based recommender system:</b> Levarages Deep Learning techniques to model complex interactions between users and items. These systems can incorporate
            a wide variety of inputs, including user behavior or item features to provide highly personalized recommendations.
            <br/><br/>
            <i>Example: Using a deep neuronal network to recommend movies by learning a combination of user and item features, thereby suggesting a movie like "The Matrix" to a user
              who frequently watches science fiction and philosophical movies.
            </i>
          </li>
        </ul>      
      </div>
      <img :src="about_recommender" class="img"/>
      
    </div>
    <div class="about-2">
      <img :src="commitment" class="img-2"/>
      <div>
        <h1>Commitment</h1>
        <div>At Sunshine Movies, we strive to offer you a personalized and enjoyable browsing experience. Our advanced recommender systems are designed to provide you with relevant, 
          diverse, and contextually appropriate movie suggestions. Explore our platform and discover how we tailor content to fit your unique preferences.
        </div>
      </div>

      
    </div>
  </div>

  <footer>
    <div class="footer-logo">
      <img :src="sun" class="footer-img"/>
      <div class="footer-text">Sunshine Movies</div>
    </div>
    <div class="footer-text2">Feel free to explore, discover, and enjoy the best recommendations tailored just for you!</div>
  </footer>

  <div class="copyright">
    &copy; {{ currentYear }} Sunshine Movies. All rights reserved.
  </div>
    


</template>


<style scoped>
* {
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.body {
    margin: 3% 3%;
    padding: 0 6.5%;
}

.about-1 {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-bottom: 4rem;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}

.img {
    /* margin-top: 2rem; */
    width: 45%;
    height: 50rem;
}

.about-recommenders {
    margin-right: 1.5rem;
}

.text {
    text-align: justify
}

ul {
  list-style:circle;
}

li {
  padding: 1rem 0;
  padding-right: 1rem;
  text-align: justify;
  line-height: 1.5rem;
}

.about-2 {
  display: flex;
  align-items: center;
  text-align: justify;
  line-height: 1.5rem;
}

.img-2 {
  border-radius: 50px;
  width: 50%;
  margin-top: 5rem;
  margin-right: 3rem;
}

footer {
  margin: 0 3%;
  margin-top: 5%;
  padding: 2% 10%;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.footer-img {
  width: 2.5rem;
  height: 2.5rem;
}

.footer-text {
  font-weight: bold;
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  width: 12rem;
  text-align: justify;
}

.footer-text2 {
  font-weight: 350;
  font-size: 1.2rem;
  padding-bottom: 1.5rem;
  width: 30rem;
  text-align: justify;
  font-style: italic;
}

.copyright {
  padding: 2% 13%;
  background-color: rgba(250, 150, 50, 0.5)
}
.footer-logo {
    width: 15rem;
    display: flex;
    justify-content: space-between;
}

</style>