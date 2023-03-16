<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function toPage (routeName) {
  console.log(routeName)
  router.push({ name: routeName })
}
</script>

<template>
  <aside class="sidebar">
    <div
      class="sidebar__avatar"
      @click="toPage"
    >
      <img
        src="../assets/dada.png"
        alt=""
      >
    </div>
    <nav class="sidebar__wrap">
      <div
        class="sidebar__item"
        @click="toPage('QuoteInput')"
      >
        <div class="sidebar__icon" />
        <h2>輸入名言</h2>
      </div>
      <div
        class="sidebar__item"
        @click="toPage('ImagesSelection')"
      >
        <div class="sidebar__icon" />
        <h2>選擇圖片</h2>
      </div>
      <div
        class="sidebar__item"
        @click="toPage('SourceInput')"
      >
        <div class="sidebar__icon" />
        <h2>輸入來源</h2>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width:20em;
  height:100vh;
  background-color: rgb(62, 62, 62);
  color:white;

  .sidebar__avatar {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    img {
      width:11rem;
      background-color: rgb(223, 191, 191);
      border: 0.4rem solid white;
      border-radius:50%;
    }
  }

  .sidebar__wrap {
    .sidebar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid yellow;
      border-bottom: 2px solid yellow;
      margin: -2px 0;

      /* padding:1rem 2rem; */
    .sidebar__icon {
      display:block;
      width:0.9rem;
      height:0.9rem;
      background-color: aqua;
      border-radius:20%;
      margin-right: 1rem;
    }

    }
  }
}

</style>
