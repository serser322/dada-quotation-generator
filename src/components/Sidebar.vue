<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'


const router = useRouter()
function toPage(routeName) {
  router.push({ name: routeName })
}

const route = useRoute()
const currentPage = computed(() => {
  return route.name
})
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__avatar">
      <img src="../assets/dada.png" alt="">
    </div>
    <nav class="sidebar__wrap">
      <div class="sidebar__item" @click="toPage('QuoteInput')">
        <div class="sidebar__icon" />
        <h2>輸入名言</h2>
      </div>
      <div class="sidebar__item sidebar__item-active" @click="toPage('ImagesSelection')">
        <div class="sidebar__icon" />
        <h2>選擇圖片</h2>
      </div>
      <div class="sidebar__item" @click="toPage('SourceInput')">
        <div class="sidebar__icon" />
        <h2>輸入來源</h2>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 20em;
  height: 100vh;
  background-color: rgb(62, 62, 62);
  color: white;

  .sidebar__avatar {
    display: flex;
    justify-content: center;
    padding: 2rem 0;

    img {
      width: 11rem;
      background-color: rgb(223, 191, 191);
      border: 0.4rem solid white;
      border-radius: 50%;
    }
  }

  .sidebar__wrap {
    box-sizing: content-box;
    .sidebar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 2px solid yellow;
      border-bottom: 2px solid yellow;
      margin: -2px 0;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 3px orange;
        color: orange;

        .sidebar__icon {
          background-color: orange
        }
      }

      .sidebar__icon {
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        background-color: aqua;
        border-radius: 20%;
        margin-right: 1rem;
      }
    }

    .sidebar__item-active {
        box-shadow: 0 0 10px 3px orangered ;
        color: orangered;
        border-top: 0px ;
        border-bottom: 0px ;
        margin: 3px 0;
        .sidebar__icon {
          background-color: orangered
        }
    }
  }
}
</style>
