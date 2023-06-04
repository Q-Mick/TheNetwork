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
  background-color: rgb(200, 243, 234);
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
</style>
