<template>
   <!-- TODO for conditional rendering of edit acct button -->
   <!-- check to see if the id from the route matches the id of the account logged in -->


        <ProfileCard :profileProp="profile" v-if="profile" />
    
    <!-- <div>{{ profile }}</div> -->


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
import { useRoute } from 'vue-router'
import { profileService } from "../services/ProfileService.js";
export default {
    components: { PostCard, ProfileCard },
    setup() {
        const route = useRoute()

        async function getProfile() {
            try {

                await profileService.getProfileById(route.params.id)
            } catch (error) {
                Pop.error(error, '[Getting Profile]')
            }
        }
        async function getPostsByProfile() {
            try {
                await postsService.getPostsByProfile(route.params.id)
            } catch (error) {
                Pop.error(error, '[Getting Profiles]')
            }
        }


        onMounted(() => {
            getProfile()
            getPostsByProfile()
        })
        return {
            profile: computed(() => AppState.activeProfile),
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


<style lang="scss" scoped></style>