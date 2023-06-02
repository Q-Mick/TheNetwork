<template>
   <h3>{{ profileProp.name }}</h3>
   <img :src="profileProp.picture" alt="">
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
.profile-card {
    background-image: v-bind(coverImg);
    aspect-ratio: 1/1;
    height: 150px;
    min-width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    place-content: center;
}
.profile-picture {
  height: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>