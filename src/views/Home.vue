<script setup>
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <main>
    <Sidebar />
    <router-view />
  </main>
</template>

<style lang="scss">
main {
  display: flex;
}
</style>
