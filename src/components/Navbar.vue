<template>
  <nav class="bg-color navbar navbar-expand-lg  px-3">
    <router-link @click="resetPosts()" class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4QKFyd-IGos1gWZtmU4QvOV_bSmFl9HnOG9CFjfZhc2UQpR7MW3edBx5-dfFOdanCIg&usqp=CAU" height="45" />
        <p class="mx-3 pt-3 fs-4" > Code Social</p>
      </div>
    </router-link>
    
      <div class="row">
        <div class="col-12 d-flex pt-1">
          <p class="m-0" >Search Posts</p>
          <form @submit.prevent="searchPosts()">
            <input class="mx-1 input-text" v-model="search" placeholder="Search..." type="text" >
          </form>
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
      <Login />
      <!-- LOGIN COMPONENT HERE -->
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
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
  background-color: #000000;


}

p{
    color:white;
    font-size: 26px;
}
input::placeholder {
  font-size: 20px;
  color: white;

}
.text-area {
  background-color: #121218;
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  height: 5rem;
  width: 80%;
  font-size: 20px;
  color: #999;
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
  color: #ffffff;
 
  font-size: 20px;
}

.input-text:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
}
.post-card {
    color: white;
    background: linear-gradient(1turn,#121218,rgba(18,18,24,0));
  
    box-shadow: 0 0 0 2px rgba(0, 255, 85, .6), 0 0 0 4px #70f7ff, 0 0 0 6px #76b6fe, 0 0 0 8px #000;
 
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

}

.banner-container img {
    width: 100%;
    max-height: 60rem;
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
