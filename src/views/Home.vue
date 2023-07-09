<script setup>
import Header from '../components/Header.vue'
import SidebarMobile from '../components/SidebarMobile.vue'
import Sidebar from '../components/Sidebar.vue'

</script>

<template>
  <div class="container">
    <SidebarMobile class="sidebar__mobile" />
    <Sidebar class="sidebar" />
    <div>
      <Header />
      <div class="container__warp">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* @mixin screen-mobile {
  @media (min-width:var(--screen-mobile)) {
    @content
  }
};

@mixin screen-pad {
  @media (min-width: var(--screen-pad)) {
    @content
  }
} */

.container {
  display: flex;
  height: auto;
  min-height: 100%;

  .sidebar__mobile {
    @media (min-width: 576px) {
      display: none
    }
  }

  .sidebar {
    display: none;

    @media (min-width: 576px) {
      display: block
    }
  }

  &>nav {
    flex-shrink: 0;
  }

  div {
    width: 100%;
    /* margin-left: 3.5rem; //保留空間給sidebar */

    @media (min-width: 576px) {
      /* margin-left: 0 */
      /* margin-left: 3.5rem; //保留空間給sidebar */
    }

    .container__warp {
      width: 80%;
      margin: 3rem auto;
    }
  }
}
</style>
