<template>
  <nav class="bg-color navbar navbar-expand-lg  px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="https://cdn.icon-icons.com/icons2/3237/PNG/512/connection_social_media_communication_user_network_friends_icon_197427.png" height="45" />
        <p class="m-0" >Code Social</p>
      </div>
    </router-link>
    <div class="container">
      <div class="row">
        <div class="col-6 d-flex pt-1">
          <label for="" style="position: relative;">Posts</label>
          <form @submit.prevent="searchPosts()">
            <input class="offset-1" v-model="search" placeholder="Search..." type="text" >
          </form>
          <i @click="resetPosts()" v-if="searching" class="text-danger mdi mdi-close offset" style="position: absolute; top: 20px;left: 30em;"><span class="text-black">Cancel Search</span></i>
        </div>
        
      </div>

    </div>
   
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <!-- <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link> -->
          
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { ref, computed, popScopeId } from "vue";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import Login from './Login.vue';
import { AppState } from "../AppState.js";
export default {
  setup() {
    const search = ref('')
    const search1 = ref('')
    return {
      search,
      search1,
      async resetPosts(){
        try {
          await postsService.getPosts()
          AppState.searching = false
        } catch (error) {
          Pop.error(error)
        }
      },
      async searchPosts(){
        try {
          const trimmedSearch = search.value.trim();
          if (trimmedSearch.length == 0) {
            Pop.toast("Please enter a term to search for")
            return
          }
          AppState.searching = true
          logger.log('Searching Posts', trimmedSearch)
          await postsService.searchPosts(trimmedSearch)
          search.value = ""
        } catch (error) {
          Pop.error(error)
        }
      },
      searching: computed(() => AppState.searching),
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
.bg-color{
  background-color: #0093E9;
background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);

}

</style>
