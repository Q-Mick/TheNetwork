<template>
    <!-- TODO for conditional rendering of edit acct button -->
    <!-- check to see if the id from the route matches the id of the account logged in -->
    <div class="row" style="margin-left: -10.5px;">
        <div class="mt-3  card-body mx-1" style="margin-left: 15px;">

            <div class="post-card elevation-5 mb-1" v-if="profile">
                <div class="row">
                    <div class="col-12">
                        <div class="banner-container">
                            <img class="" :src="profile?.coverImg" :alt="profile.name">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12" style="position: relative;">
                        <div class="avatar-container" style="position: absolute; top: -3rem; left: 1.2rem;">
                            <img class :src="profile.picture" :alt="profile.name">

                        </div>
                        <div class="text-end mb-2">
                            <i style="cursor: pointer;" class="mx-1 fs-3 mdi mdi-github" @click="toLink(profile.github)"></i>
                            <i style="cursor: pointer;" class="mx-1 fs-3 mdi mdi-linkedin" @click="toLink(profile.linkedIn)"></i>
                            <i style="cursor: pointer;" class="mx-1 fs-3 mdi mdi-file" @click="toLink(account.resume)"></i>
                        </div>
                        <p v-if="profile.graduated" class="m-0 pt-0 mx-1 p-1">{{ profile.class }} alumni</p>
                        <h5 class="pt-0 mx-1 p-1">{{ profile.name }}</h5>
                        <p class="mb-1 mx-1 p-1">{{ profile.bio }}</p>
                    </div>
                    <div v-if="profile?.id === account?.id" class="text-end">
                        <router-link :to="{ name: 'Account' }">
                            <button class="m-1 edit-btn">Edit</button>
                        </router-link>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <div v-if="account?.id == profile?.id" class="row">

        
    <div class="card-body" style="margin-left: 15px;">

      <div class="post-card my-3 elevation-5" style="margin-right: 6px; margin-left: -6px;">
        <form @submit.prevent="addPost()">

          <div class="col-12">
            <div class="d-flex">
              <div class="m-1 avatar-container">
                <img class :src="account?.picture" :alt="profile?.name">
              </div>
              <textarea v-model="editable.body" class="m-2 text-area"></textarea>
            </div>
          </div>
          
          <div class="row">
            <div class="col-12">
              <div class="text-end">
                <input v-model="editable.imgUrl" class="input-text" type="text" placeholder="Image Url">
                <button  type="submit" class="mdi mdi-post edit-btn mx-2"> Create Post</button>
              </div>
              
            </div>
          </div>
        </form>

      </div>
    </div>
    
 
    </div>
    

    <div v-for="(p) in posts" :key="p?.id">
        <PostCard :postProp="p" />
    </div>
    <button v-if="previousUrl != null" @click="changePage(previousUrl)" class="edit-btn m-2 fs-5">Previous</button>
    <button v-if="nextUrl != null" @click="changePage(nextUrl)" class="edit-btn m-2 fs-5">Next</button>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import PostCard from "../components/PostCard.vue";
import ProfileCard from "../components/ProfileCard.vue";
import AddPost from "../components/AddPost.vue";
import { Account } from "../models/Account.js";
import { Profile } from "../models/Profile.js";
import { useRoute } from 'vue-router'
import { profileService } from "../services/ProfileService.js";
export default {
    components: { PostCard, ProfileCard, AddPost },
    setup() {
        const editable = ref({body: '', imgUrl: ''})
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
        async function getVerts(){
        try {
          await postsService.getVerts()
        } catch (error) {
          Pop.error(error)
        }
      }

        onMounted(() => {
            getVerts()
            getProfile()
            getPostsByProfile()
        })
        return {
            editable,
            account: computed(() => AppState.account),
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
            },
            toLink(url) {

                if (url) {
                    const link = url
                    window.location.href = link;
                } else {
                    Pop.toast("Profile has no link shared")
                }
            },
            async addPost() {
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
            }

        }
    }

}
</script>


<style lang="scss" scoped>
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

.profile-container {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    //   padding: 20px;
    //   transition: transform 0.3s ease;
}

// .profile-container:hover {
//   transform: translateY(-4px);
// }

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
  max-width: 60vw;
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
    // outline: solid linear-gradient(210deg,rgba(0,255,85,.6),#70f7ff 10%,#76b6fe 60%,#000 80%);
    box-shadow: 0 0 0 2px rgba(0, 255, 85, .6), 0 0 0 4px #70f7ff, 0 0 0 6px #76b6fe, 0 0 0 8px #000;
    // margin: 0.25rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    transition: transform 0.3s ease;
}
button[disabled] {
  background-color: #808080;
}
</style>