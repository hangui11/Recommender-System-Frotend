<script setup>
import NavContainer from '../NavContainer.vue';
import item_based from '@/assets/images/item_based.png'
</script>


<template>
    <NavContainer/>
    <div class="body">
        <h1>Item-to-Item based Recommender</h1>
        <p>An item-to-item based recommender system, also known as collaborative filtering, is a sophisticated method designed to offer personalised movie recommendations by leveraging
            the attributes of similar items. This system identifies movies that share similar features with those already rated by the target user. By analyzing the ratings and interactions
            of these similar items, the recommender can suggest movies that the target has not yet rated but are likely to be of interest based on positive ratings from other users.
        </p>

        <img :src="item_based"/>

        <div>
            <p><b>How It Works</b></p>
            <p>The core principal behind item-to-item collaborative filtering is the identification of item similarity, often referred to as 'neighbor items'. Here's how it operates: </p>
            <ul class="steps">
                <li>
                    <b>Data Collection: </b> The system collects and analyzes item behavior data, such as movie ratings, watch history, and other interactions.
                </li>
                <li>
                    <b>Similarity Calculation: </b> Using similarity metrics like Pearson correlation, the system calculates the degree of similarity between items based on the ratings evaluated
                    by users.
                </li>
                <li>
                    <b>Neighbor Selection: </b> The system identifies a set of items (neighbors) who have the highest similarity scores with the unrated items by a target user.
                </li>
                <li>
                    <b>Recommendation Generation: </b> Movies that have a high predicted rating, based on their similarity to other movies rated positively by the user, but have not been rated by
                    the target user are recommended. The assumption is that the target user will likely enjoy these unseen movies because they share similar features with movies the user has already
                    rated positively.
                </li>
            </ul>
        </div>

        <div>
            <p>This approach has several advantages: </p>
            <ul>
                <li>
                    <b>Enhanced Personalization: </b> Tailors recommendations to individual user preferences by focusing on the attributes of items the user has already rated, leading to more accurate
                    and relevant suggestions.
                </li>
                
                <li>
                    <b>Improved Accuracy: </b> Often provides more precise recommendations compared to user-to-user systems, especially in cases where users have diverse and unique tastes. It excels in
                    leveraging detailed item attributes to refine suggestions.
                </li>

                <li>
                    <b>Mitigation of Cold Start Problem: </b> Addresses the cold start problem by leveraging item features, enabling meaningful recommendations even for new users or items with limited
                    interaction history.
                </li>

            </ul>
        </div>
        
        <div>
            <p>However, there are some limitations to this approach: </p>
            <ul>
                <li>
                    <b>Limited Novelty: </b> May result in less diverse recommendations, as it tends to suggest items similar to those the user has already interacted with, potentially missing
                    out on novel or unexpected items.
                </li>
                
                <li>
                    <b>Feature Dependency: </b> The quality of recommendations heavily depends on the quality and completeness of item feature data. Inadequate or inaccurate feature data can lead
                    to suboptimal suggestions.
                </li>

                <li>
                    <b>Scalability: </b> Although scalable with a large number of items, the computational complexity can increase with the number of item features, potencially impacting 
                    performance if not managed efficiently.
                </li>
            </ul>
        </div>

        <p>
            Item-to-item based recommender system offers a robust and effective approach to personalized movie recommendations. By focusing on the features and attributes of items, it delivers highly
            accurate and relevant suggestions, enhancing user satisfaction and engagement. This method's accuracy and ability to mitigate cold start problems make it an invaluable tool for modern
            recommendation systems, ensuring a superior user experience.
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