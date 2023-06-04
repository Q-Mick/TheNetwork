<template>
  <div class="row">
    <div class="card-body mx-1">

      <div class="post-card elevation-5 mt-1" v-if="account">
        <div class="row">
          <div class="col-12">
            <div class="banner-container">
              <img class="" :src="account?.coverImg" :alt="account.name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12" style="position: relative;">
            <div class="avatar-container" style="position: absolute; top: -2.7rem; left: 1.2rem;">
              <img class :src="account.picture" :alt="account.name">

            </div>
            <div class="text-end">
              <i style="cursor: pointer;" class="mx-1 fs-3 mdi mdi-github" @click="toLink(account.github)"></i>
              <i style="cursor: pointer;" class="mx-1 fs-3 mdi mdi-linkedin" @click="toLink(account.linkedIn)"></i>
            </div>
            <p v-if="account.graduated" class="m-0 pt-0 mx-1 p-1">{{ account.class }} alumni</p>
            <h5 class="pt-0 mx-1 p-1">{{ account.name }}</h5>
            <p class="mb-1 mx-1 p-1">{{ account.bio }}</p>
          </div>
          <div class="text-end">
            <button disabled class="edit-btn fs-5">Editing account</button>
          </div>

        </div>
      </div>

    </div>
  </div>
  <div class="row">
    <div class="card-body">


      <div class="post-card elevation-5 mt-3 m-1 p-1">

        <form class="" @submit.prevent="handleSubmit">
          <div v-if="account.id" class="card-body">
            
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Name:</span>
              <input name="name" class="input-text form-control" placeholder="Name" type="text" required v-model="editable.name">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Bio:</span>
              <textarea v-model="editable.bio" class="text-area form-control" aria-label="With textarea"></textarea>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Img Url:</span>
              <input name="picture" class="input-text form-control" placeholder="Profile Picture" type="url" required
                v-model="editable.picture">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Cover Img:</span>
              <input name="cover-img" class="input-text form-control" placeholder="Cover image" type="url" required
                v-model="editable.coverImg">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">GitHub:</span>
              <input name="cover-img" class="input-text form-control" placeholder="Github URL" type="url" v-model="editable.github">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">LinkedIn:</span>
              <input name="cover-img" class="input-text form-control" placeholder="LinkedIn URL" type="url"
                v-model="editable.linkedin">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Resume:</span>
              <input name="cover-img" class="input-text form-control" placeholder="Resume URL" type="url"
                v-model="editable.resume">
            </div>

          </div>
          <div class="text-end">
            <button class="edit-btn m-2 fs-5" type="submit">Save Account</button>
          </div>
        </form>
      </div>

    </div>


  </div>
</template>

<script>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';
import { postsService } from "../services/PostsService.js";
export default {
  setup() {
    const editable = ref({})
    onMounted(() => getVerts())
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })
    async function getVerts(){
        try {
          await postsService.getVerts()
        } catch (error) {
          Pop.error(error)
        }
      }

    return {
      account: computed(() => AppState.account),
      editable,
      async handleSubmit() {
        try {
          Pop.toast('updating account')
          await accountService.editAccount(editable.value)
        } catch (error) {
          Pop.error(error, '[Editing Account]')
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
    }
  }
}
</script>


<style lang="scss" scoped>

span{
  color: rgb(235, 235, 235);
  background-color: #121218;
}

input::placeholder {
  font-size: 20px;
  color: #999;
}
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
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .5);
  background: linear-gradient(90deg, #70f7ff, #76b6fe); 
  border: 2px solid #6ac6f5;
  color: black;
  padding: 1px 15px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.edit-btn:hover {
  background-color: #6ac6f5;
  color: #000000;
  box-shadow: inset 0 3px 5px rgba(127, 243, 160, 0.5);
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
.banner-container {
  position: relative;
  width: 100%;
  height: 20rem;
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