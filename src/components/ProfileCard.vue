<template>
    <div class="profile-card">

        <h3>{{ profileProp.name }}</h3>
        
        <img class="img-fluid" :src="profileProp.picture" alt="">
    </div>
</template>


<script>
import { AppState } from "../AppState.js";


import { Profile } from "../models/Profile.js";
export default {
    props: {
        profileProp: { type: Profile, required: true }
    },
    setup(props) {
      


        return {
            
        }
    }
}
</script>


<style lang="scss" scoped>

.profile-picture {
  height: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>