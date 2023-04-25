<script setup>
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <div class="container">
    <Sidebar />
    <div class="container__wrapper">
      <Header />
      <router-view class="router-view" />
    </div>
  </div>
</template>

<style lang="scss">
.container {
  display: flex;

  .container__wrapper {
    width:100%;
    margin-left: 3.5rem;

    @media (min-width: 576px) {
      margin-left: 0
    }
  }
}
</style>
