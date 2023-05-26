<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <div class="container">
    <Sidebar />
    <div>
      <Header />
      <div class="container__warp">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;

  &>nav {
    flex-shrink: 0;
  }

  div {
    width: 100%;
    margin-left: 3.5rem;

    @media (min-width: 576px) {
      margin-left: 0
    }

    .container__warp {
      width: 80%;
      margin: 3rem auto;

      @media (min-width: 1200px) {
        /* min-width: */
      }
    }
  }
}
</style>
