<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

</script>

<template>
  <div class="container">
    <div>
      <Header />
      <div class="container__warp">
        <router-view />
      </div>
      <Footer />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  height: auto;

  .sidebar {
    display: none;
  }

  &>nav {
    flex-shrink: 0;
  }

  div {
    width: 100%;
    min-height: 75vh;

    .container__warp {
      width: 90%;
      margin: 2rem auto;
    }
  }
}

@media (min-width: 576px) {
  .container {
    /* .sidebar__mobile {
      display: none
    }

    .sidebar {
      display: block
    } */

  }
}

@media (min-width: 768px) {
  .container {
    div {
      .container__warp {
        width: 80%;
        margin: 3rem auto;
      }
    }
  }
}
</style>
