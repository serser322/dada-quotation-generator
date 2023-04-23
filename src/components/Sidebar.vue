<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

onMounted(() => {
  isExpanded.value = window.innerWidth >= 576
})

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

watch(isExpanded, newValue => {
  // console.log(document.querySelectorAll('.sidebar__item'))
})
</script>

<template>
  <nav
    class="sidebar"
    :class="{ 'sidebar-expanded': isExpanded }"
    @click="toggleSidebar"
  >
    <!-- Avatar | Start -->
    <div class="sidebar__avatar">
      <img
        src="../assets/dada.png"
        alt=""
      >
    </div>
    <div class="sidebar__wrap">
      <div class="sidebar__line" />
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isQuoteInput }"
        @click.stop="toPage('QuoteInput')"
      >
        <span class="material-symbols-outlined">
          chat
        </span>
        <div
          class="text-hidden"
        >
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
        <div
          class="text-hidden"
        >
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
        <div>
          輸入來源
        </div>
      </div>
      <div class="sidebar__line" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>

@mixin web {
  @media (min-width: 576px) {
    @content
  }
}

.sidebar {
  position: fixed;
  width: 3.5rem;
  height: 100vh;
  background-color: rgb(62, 62, 62);
  color: white;
  z-index: 1;
  transition: all 0.5s ease;

  @include web {
    position: relative;
    width: 5rem;
  }

  &:hover {
    cursor: pointer;
  }

  .sidebar__avatar {
    display: flex;
    justify-content: center;
    padding: 1rem 0;

    img {
      width: 3rem;
      background-color: rgb(223, 191, 191);
      border: 0.1rem solid white;
      border-radius: 50%;
      transition: width 0.5s ease;

      @include web {
        width: 4rem;
      }
    }
  }

  .sidebar__wrap {
    .sidebar__item {
      position: relative;
      z-index: 2;
      padding:1rem 0;
      display: flex;
      align-items: center;
      white-space: nowrap;

      &:hover {
        cursor: pointer;
        background-color: azure;
        box-shadow: 0 0 10px 3px orange;
        color: orange;

        :first-child {
          color: orange
        }
      }

      /* icon */
      :first-child {
        margin: 0rem 0.75rem;
        font-size: 2rem;
        color: aquamarine;
        font-weight: bold;
        /* transition: all 0.3s ease; */
      }

      :nth-child(2) {
        /* display: inline-block; */

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

  .sidebar__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgb(62, 62, 62);
    transition: transform 0.3s ease-out;
  }
}

/* Expanded */
.sidebar-expanded {
  width: 10.5rem;

  /* .sidebar__avatar {
    img {
      width: 6rem;
    }
  } */

  .sidebar__wrap {
    .sidebar__item {
      :first-child {
        margin: 1rem;
      }

      :nth-child(2) {
        /* width: auto; */
        /* padding: auto 0; */
        /* margin: 1rem 0; */
        /* height: 3rem; */
        /* margin: 1.2rem 0; */
        font-size: 1.5rem;
        visibility: visible;
        opacity: 1;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
      }
    }
  }

  .sidebar__toggle {
    transform: rotate(180deg);
  }

}
.text-hidden {
  /* font-size: 0px; */
  /* width: 0;
  height: 0; */
  /* overflow: hidden; */
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

</style>
