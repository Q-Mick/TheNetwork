<template>
  <div v-if="account?.id" class="row">
    <div class="card-body" style="margin-left: 15px;">

      <div class="post-card mx-1 my-3 elevation-5">
        <form @submit.prevent="addPost()">

          <div class="col-12">
            <div class="d-flex">
             
              <div class="avatar-container">
                <img class :src="account?.picture" :alt="account?.name">
              </div>
              <textarea v-model="editable.body" class="m-2 text-area"></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="text-end">
                <input v-model="editable.imgUrl" class="input-text" type="text" placeholder="Image Url">
                <button  type="submit" class="mdi mdi-post edit-btn mx-2">Create Post</button>
              </div>
              
            </div>
          </div>
        </form>

      </div>
    </div>
    
  </div>

  
  <div v-for="(p) in posts" :key="p.id">
    <PostCard :postProp="p" />
  </div>
  <button  :disabled="!previousUrl" @click="changePage(previousUrl)" class="edit-btn m-2 fs-5">Previous</button>
  <button  :disabled="!nextUrl" @click="changePage(nextUrl)" class="edit-btn m-2 fs-5">Next</button>
</template>

<script>
import { watchEffect, ref, computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
import AddPost from "../components/AddPost.vue";
import { Account } from "../models/Account.js";
import { Profile } from "../models/Profile.js";
import { Post } from "../models/Post.js";
export default {
  components: { PostCard, ProfileCard, AddPost },
  setup() {
    const editable = ref({body: '', imgUrl: ''})


    onMounted(() => getPosts())
    onMounted(() => getVerts())
    async function getPosts() {
      try {
        await postsService.getPosts()

      } catch (error) {
        Pop.error(error)
      }
    
    }
    async function getVerts(){
        try {
          await postsService.getVerts()
        } catch (error) {
          Pop.error(error)
        }
      }
    return {
      editable,
      account: computed(() => AppState.account),
      posts: computed(() => AppState.posts),
      previousUrl: computed(() => AppState.previousPage),
      nextUrl: computed(() => AppState.nextPage),
      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      },
      async addPost(){
        let postBody = editable.value.body.trim()
        logger.log(postBody)
        if (postBody.length == 0) {
          Pop.toast('You can not submit an empty post')
          return
        }
        Pop.toast('Submitting Post')
        try {
          await postsService.addPost(editable.value)
          editable.value = {}
        } catch (error) {
          Pop.error(error)
        }
      },


    }
  }
}
</script>

<style scoped lang="scss">

  input::placeholder {
  font-size: 20px;
  color: #999;
}
.text-area {
  background-color: #121218;
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  height: 5rem;
  width: 90%;
  font-size: 20px;
  color: white;
}
.text-area:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
}

.input-text {
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  background-color: #121218;
  color: white;
  // width: 60%;
  font-size: 20px;
}

.input-text:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
}

.edit-btn {
    background-color: #fff;
    border: 2px solid #6ac6f5;
    color: #000000;
    padding: 1px 15px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

}

.edit-btn:hover {
    background-color: #6ac6f5;
    color: #000000;
}



.banner-container {
  position: relative;
  width: 100%;
  height: 10rem;
  /* Adjust the height as needed */
  overflow: hidden;
}

.banner-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

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

.input-text {
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  width: 60%;
  font-size: 14px;
}

.input-text:focus {
  border-bottom-color: #555;
}

</style>
