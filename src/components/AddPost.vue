<template>
<div class="card-body">

<div class="post-card mx-1 my-3 elevation-5">
  <form @submit.prevent="handleSubmit">

    <div class="col-12">
      <div class="d-flex">
        <div class="m-1 avatar-container">
          <img class :src="account?.picture" :alt="profile?.name">
        </div>
        <textarea class="m-2 text-area"></textarea>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12">
        <div class="text-end">
          <input class="input-text" type="text" placeholder="Image Url">
          <button  type="submit" class="mdi mdi-post edit-btn mx-2"> Post</button>
        </div>
        
      </div>
    </div>
  </form>

</div>
</div>
</template>


<script>
import { computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { postsService } from '../services/PostsService.js';
import { AppState } from "../AppState.js";
import { Profile } from "../models/Profile.js";

export default {
    props: {
        profileProp: { type: Profile, required: true }
    },
    setup(props) {
        return {
            post: computed(()=> AppState.post),
            user: computed(() => AppState.user),
            profile: computed(()=> AppState.profile),
            account: computed(() => AppState.account),

        }
    }
}
</script>


<style lang="scss" scoped>
.profile-container {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    // height: 8rem;
    // padding: 20px;
    //   transition: transform 0.3s ease;
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
    background-color: #6ac6f5;
    color: #fff;
}

.text-area {
    border: 1px solid #999;
    outline: none;
    padding: 5px;
    width: 80%;
    font-size: 14px;
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
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);


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

.post-card {
    background-color: #ffffff;
    // margin: 0.25rem;
    border-radius: 0.25rem;
    padding: 0.5rem;
    // transition: transform 0.3s ease;
}
</style>