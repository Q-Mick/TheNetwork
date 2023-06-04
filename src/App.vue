<template>
  <header>
    <Navbar />
  </header>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div v-if="account.id" class="col-2">
          <UserDetails />

        </div>
        <div class="col">
          
          <router-view />
        </div>
        <div class="col-3">
          <!-- vert component here -->
          <Verts />
        </div>
        
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import Verts from './components/Verts.vue'
import UserDetails from "./components/UserDetails.vue"
import { Account } from "./models/Account.js"
export default {
  setup() {
    return {
      account:computed(() => AppState.account),
      vert1: computed(() => AppState.verts[0].tall),
      vert2: computed(() => AppState.verts[1].tall),
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, Verts, UserDetails }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}
main{
  background-color: rgb(0, 0, 0);
}
:header {
  --bg-grad: radial-gradient(circle, rgba(46,151,191,1) 15%, rgba(97,202,238,1) 37%, rgba(37,223,196,1) 73%);
  --blur: 10px;
}
header{
  background-color: var(--bg-grad);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
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
</style>
