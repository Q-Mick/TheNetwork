<template>
    <div class="row">
        <div class="card-body" style="margin-left: 15px;">
            <div class="post-card mx-1 my-3 elevation-5">
                
                <div class="col-6">
                    <div class="avatar-container d-flex justify-content-between">
                        <router-link :to="{ name: 'Profile', params: { id: postProp.creator.id } }">
                            <img class=""  :src="postProp.creator.picture" alt="">
                        </router-link>
                    </div>
                    
                </div>
                <div class="">
                    <h3>{{ postProp?.creator?.name }}</h3>
                </div>
                <p>{{ postProp.body }}</p>
                <div v-if="postProp.imgUrl != ''" class="banner-container">
                    <img :src="postProp.imgUrl" alt="">
                </div>
                <div class="row">
                    <div class="col-12 text-end">
                        <p class="m-0">Posted at: {{ postProp?.createdAt }}</p>

                        <div v-if="account?.id" class="d-flex justify-content-between">

                            <p @click="toggleLike(postProp.id)" class="fs-3 m-0 pt-2" style="cursor: pointer;">❤️{{
                                postProp.likes.length }} Like</p>

                            <button @click="deletePost(postProp?.id)" v-if="postProp?.creator.id == account?.id"
                                class="edit-btn mt-1" style="cursor: pointer;" title="Delete Post"><span
                                    class="mdi mdi-delete"></span>Delete Post</button>
                        </div>
                        <div v-else="">
                            <span class="m-0" style="cursor: pointer;">❤️ {{ postProp.likes.length }} Like</span>
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
p{
    color:gray
}

.post-card {
    color: white;
    background: linear-gradient(1turn,#121218,rgba(18,18,24,0));
    // outline: solid linear-gradient(210deg,rgba(0,255,85,.6),#70f7ff 10%,#76b6fe 60%,#000 80%);
    box-shadow: 0 0 0 2px rgba(0, 255, 85, .6), 0 0 0 4px #70f7ff, 0 0 0 6px #76b6fe, 0 0 0 8px #000;
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
    height: 100%;
    /* Adjust the height as needed,*/
    overflow: hidden;
    // overflow-y: scroll;
    // max-height: 50vh
}

.banner-container img {
    width: 100%;
    max-height: 35rem;
    object-fit: cover;
    object-position: center;

    

}

.edit-btn {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .5);
  background: linear-gradient(90deg, #70f7ff, #76b6fe); 
  border: 2px solid #6ac6f5;
  color: black;
  padding: 1px 15px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.edit-btn:hover {
  background-color: #6ac6f5;
  color: #000000;
  box-shadow: inset 0 3px 5px rgba(127, 243, 160, 0.5);
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