<script setup>
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <main class="home-page">
    <Sidebar />

    <h1>Home1234</h1>

    <router-view />
  </main>
</template>

<style lang="scss">
main {
  display: flex;
}
</style>
