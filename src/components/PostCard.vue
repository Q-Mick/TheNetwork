<template>
    <div class="">
        <div class="card-body">
            <div class="post-card elevation-5">


                <h3>{{ postProp.creator.name }}</h3>
                <router-link :to="{ name: 'Profile', params: { id: postProp.creator.id } }">
                    <img class="rounded-circle post-author img-fluid" :src="postProp.creator.picture"
                        alt="postProp.creator.name">
                </router-link>
                <p>{{ postProp.body }}</p>

                <i @click="toggleLike(postProp.id)" class="mdi mdi-heart">{{ postProp.likes.length }}</i>


            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";

export default {
    props: {
        postProp: { type: Post, required: true }
    },
    setup(props) {
        return {
            toggleLike(id){
                logger.log(id)
            }
            // setActivePost() {
            //     AppState.activePost = props.post
            // }
        }
    }
}
</script>


<style lang="scss" scoped>
.post-author {
    height: 60px;
    aspect-ratio: 1/1;
    object-fit: cover;

}
</style>