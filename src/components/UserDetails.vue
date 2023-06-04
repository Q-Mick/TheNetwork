<template>
    <div v-if="account?.id" class="mt-1 card-body d-flex bg-white flex-column p-1 elevation-5 rounded">

        <div class="avatar-container">
            <img class="" :src="account.picture" alt="">
        </div>
        <p class="fw-bold m-0">{{ account.name }}</p>
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
</style>