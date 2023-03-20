<script setup>
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <Sidebar />
  <main>
    <router-view />
  </main>
</template>

<style lang="scss">
main {
  display: flex;

  padding-left:3.5rem;

}
</style>
