<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
function toPage (routeName) {
  router.push({ name: routeName })
}

const route = useRoute()
const isQuoteInput = computed(() => route.name === 'QuoteInput')
const isImagesSelection = computed(() => route.name === 'ImagesSelection')
const isSourceInput = computed(() => route.name === 'SourceInput')

const isExpanded = ref(false)
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar-expanded': isExpanded }"
    @click="toggleSidebar"
  >
    <!-- <div class="sidebar__toggle">
        <span
          class="material-symbols-outlined"
        >
          keyboard_double_arrow_right
        </span>
      </div> -->
    <div class="sidebar__avatar">
      <img
        src="../assets/dada.png"
        alt=""
      >
    </div>
    <nav class="sidebar__wrap">
      <div class="sidebar__line" />
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isQuoteInput }"
        @click.stop="toPage('QuoteInput')"
      >
        <span class="material-symbols-outlined">
          chat
        </span>
        <div class="text-hidden">
          輸入名言
        </div>
      </div>
      <div class="sidebar__line" />
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isImagesSelection }"
        @click.stop="toPage('ImagesSelection')"
      >
        <span class="material-symbols-outlined">
          imagesmode
        </span>
        <div class="text-hidden">
          選擇立繪
        </div>
      </div>
      <div class="sidebar__line" />
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isSourceInput }"
        @click.stop="toPage('SourceInput')"
      >
        <span class="material-symbols-outlined">
          link
        </span>
        <div class="text-hidden">
          輸入來源
        </div>
      </div>
      <div class="sidebar__line" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  width: 10rem;
  height: 100vh;
  background-color: rgb(62, 62, 62);
  color: white;
  z-index: 1;
  transition: width 0.5s ease;

  .sidebar__toggle {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 0;
    right: -25px;
    background-color: rgb(62, 62, 62);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar__avatar {
    display: flex;
    justify-content: center;
    padding: 2rem 0;

    img {
      width: 6rem;
      background-color: rgb(223, 191, 191);
      border: 0.4rem solid white;
      border-radius: 50%;
      transition: width 0.5s ease;
    }
  }

  .sidebar__wrap {
    box-sizing: content-box;

    .sidebar__item {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px 3px orange;
        color: orange;

        :first-child {
          color: orange
        }
      }

      :first-child {
        margin: 1.2rem 0;
        margin-right: 0rem;
        color: aquamarine;
        font-weight: bold;
        transition: margin-right 0.2s ease;
      }
    }

    .sidebar__line {
      height: 0;
      width: 100%;
      border: 2px solid yellow
    }

    .sidebar__item-active {
      box-shadow: 0 0 10px 3px orangered;
      color: orangered;

      :first-child {
        color: orangered
      }
    }
  }

  /* @media (min-width:576px) {
    width: 20rem;
  } */
}

/* Sidebar expanded */

.sidebar-expanded {
  width: 20rem;

  .sidebar__avatar {
    img {
      width: 11rem;
    }
  }

  .sidebar__wrap {
    .sidebar__item {

      :first-child {
        /* margin-right: 1rem; */
      }

      :nth-child(2) {
        width: auto;
        /* height: 3rem; */
        /* margin: 1.2rem 0; */
        font-size: 1.5rem;
        visibility: visible;
        opacity: 1;
      }
    }
  }

}

.text-hidden {
  /* font-size: 0px; */
  width: 0;
  height: 0;
  overflow: hidden;
  /* visibility: hidden;
  opacity: 0; */
  transition: all 0.5s ease;
}
</style>
