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
      width: 900px;
      margin: 3rem auto;
    }
  }
}
</style>
