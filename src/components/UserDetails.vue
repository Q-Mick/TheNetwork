<template>


   
<div v-if="account?.id" class="mt-3 card-body d-flex bg-white flex-column p-1 elevation-5 rounded">

    <div class="avatar-container">
        <img class="" :src="account.picture" alt="">
    </div>
    <p class="fw-bold m-0">{{account.name}}</p>
    <p v-if="account.graduated" class="m-0">{{account.class}}</p>
    <p class="m-0">{{account.bio}}</p>
</div>


</template>


<script>
import { AppState } from "../AppState.js";
import { computed } from "vue";
export default {
    setup() {
        return {
            account: computed(() => AppState.account)
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