<template>
    <div v-if="account?.id" class="post-card mt-3 card-body d-flex flex-column p-1 elevation-5 rounded">

        <div class="avatar-container">
            <img class="" :src="account.picture" alt="">
        </div>
        <h5 class="fw-bold m-0">{{ account.name }}</h5>
        <p v-if="account.graduated" class="m-0">{{ account.class }}</p>
        <p class="m-0">{{ account.bio }}</p>
        <div class="text-end">
            <router-link :to="{ name: 'Account' }">
                <button class="m-1 edit-btn">Edit</button>
            </router-link>
        </div>
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
p{
    color:gray
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
</style>