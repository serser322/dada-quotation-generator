<script setup>
import BaseSidebar from '../components/BaseSidebar.vue'
// import BaseHeader from '../components/BaseHeader.vue'

</script>

<template>
  <main>
    <!-- <BaseHeader /> -->
    <BaseSidebar />
    <router-view class="router-view" />
  </main>
</template>

<style lang="scss">
main {
  display: flex;

  &:nth-child(2) {
    margin-left: 3.5rem;

    @media (min-width: 576px) {
      margin-left: 0
    }
  }
}
</style>
