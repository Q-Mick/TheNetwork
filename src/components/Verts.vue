<template>
    <div class="bg-white elevation-5 my-1">

        <div class="row p-1">
            <div class="col-12">
                <img class="banner-container" :src="verts[0]?.tall" alt="">
            </div>
        </div>
        
        <div class="row p-1">
            <div class="col-12">
                <img class="banner-container" :src="verts[1]?.tall" alt="">
            </div>
        </div>
    </div>
    </template>


<script>
import { AppState } from "../AppState.js";
import { computed } from "vue";
export default {
    setup() {
        return {
            verts: computed(()=>AppState.verts)
        }
    }
}
</script>


<style lang="scss" scoped>

.banner-container {
    position: relative;
    width: 100%;
    height: 100%rem;
    /* Adjust the height as needed */
    overflow: hidden;
}

.banner-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;

}
</style>