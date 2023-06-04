<template>
    <div class="mt-3 post-card my-1">

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
  color: #999;
  // width: 60%;
  font-size: 20px;
}

.input-text:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
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
  width: 85%;
  font-size: 14px;
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