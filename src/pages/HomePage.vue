<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3">
        <p>Account here</p>
        
      </div>
      <div class="col-6">
        
        <div v-for="(p) in posts" :key="p.id">
          <PostCard :postProp="p" />
        </div>
        <button :disabled="!previousUrl" @click="changePage(previousUrl)" class="m-1">Previous</button>
        <button :disabled="!nextUrl" @click="changePage(nextUrl)" class="m-1">Next</button>
      </div>
      <div class="col-3">
        <p>Verts Here</p>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
import { Account } from "../models/Account.js";
import { Profile } from "../models/Profile.js";
export default {
  components: { PostCard , ProfileCard},
  setup() {
    onMounted(() => getPosts())
    async function getPosts() {
      try {
        await postsService.getPosts()

      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      posts: computed(() => AppState.posts),
      previousUrl: computed(() => AppState.previousPage),
      nextUrl: computed(() => AppState.nextPage),
      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          Pop.error(error)
        }
      }

    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .post-author {
    height: 60px;
    aspect-ratio: 1/1;
    object-fit: cover;

  }
}
</style>
