<template>
    <div class="row">
        <div class="card-body" style="margin-left: 15px;">
            <div class="post-card mx-1 my-3 elevation-5">

                <div class="d-flex justify-content-between">
                    <h3>{{ postProp?.creator?.name }}</h3>
                    <p>Posted at: {{ postProp?.createdAt }}</p>
                </div>
                <router-link :to="{ name: 'Profile', params: { id: postProp.creator.id } }">
                    <div class="avatar-container">
                        <img class=""  :src="postProp.creator.picture" alt="">
                    </div>
                </router-link>
                <p>{{ postProp.body }}</p>
                <div v-if="postProp.imgUrl != ''" class="banner-container">
                    <img :src="postProp.imgUrl" alt="">
                </div>
                <div class="row">
                    <div class="col-12 ">

                        <div v-if="account?.id" class="d-flex justify-content-between">

                            <p @click="toggleLike(postProp.id)" class="m-0 pt-2" style="cursor: pointer;">❤️{{
                                postProp.likes.length }}</p>

                            <button @click="deletePost(postProp?.id)" v-if="postProp?.creator.id == account?.id"
                                class="edit-btn mt-1" style="cursor: pointer;" title="Delete Post"><span
                                    class="mdi mdi-delete"></span>Delete Post</button>
                        </div>
                        <div v-else="">
                            <span class="m-0" style="cursor: pointer;">❤️ {{ postProp.likes.length }}</span>
                        </div>
                    </div>
                </div>
               

            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue'
import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {

    props: {
        postProp: { type: Post, required: true }
    },
    setup(props) {
        return {
            async deletePost(postId) {
                try {
                    await Pop.confirm('Are you sure you want to delete the post?')
                    await postsService.deletePost(postId)
                } catch (error) {
                    logger.log(error)
                }
            },
            async toggleLike(id) {
                try {
                    await postsService.toggleLike(id)
                } catch (error) {
                    logger.log(error)
                }
            },
            user: computed(() => AppState.user),
            account: computed(() => AppState.account),
            // setActivePost() {
            //     AppState.activePost = props.post
            // }
        }
    }
}
</script>


<style lang="scss" scoped>
.post-author {
    border: double;
    color: black;
    height: 60px;
    aspect-ratio: 1/1;
    object-fit: cover;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
}

.post-card {
    background-color: #ffffff;
    // margin: 0.25rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    transition: transform 0.3s ease;
}

.post-card:hover {
    transform: translateY(-4px);
}

.banner-container {
    position: relative;
    width: 100%;
    height: 100%rem;
    /* Adjust the height as needed */
    overflow: hidden;
    // overflow-y: scroll;
    max-height: 50vh
}

.banner-container img {
    width: 100%;
    max-height: 40rem;
    object-fit: cover;
    object-position: center;

    

}

.edit-btn {
    background-color: #fff;
    border: 2px solid #6ac6f5;
    color: #6ac6f5;
    padding: 1px 15px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

}

.edit-btn:hover {
    border: 2px solid #f56a6a;
    background-color: #f56a6a;
    color: #000000;
}
.avatar-container {
    width: 100px;
    position: relative;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #000;


}

.avatar-container img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>