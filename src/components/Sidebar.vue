<script setup>
import { ref, computed, onMounted } from 'vue'
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
</script>

<template>
  <!-- Sidebar | Start -->
  <aside
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
    <!-- Avatar | End -->

    <!-- Nav | Start -->
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
        <div>
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
        <div>
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
    </nav>
    <!-- Nav | End -->

    <!-- Toggle icon | Start -->
    <div class="sidebar__toggle">
      <span class="material-symbols-outlined">
        keyboard_double_arrow_right
      </span>
    </div>
    <!-- Toggle icon | End -->
  </aside>
  <!-- Sidebar | End -->
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
  transition: width 0.5s ease;

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
    padding: 0.8rem 0;

    @include web {
      padding: 1.5rem 0;
    }

    img {
      width: 2.8rem;
      background-color: rgb(223, 191, 191);
      border: 0.2rem solid white;
      border-radius: 50%;
      transition: width 0.5s ease;

      @include web {
        width: 4rem;
      }
    }
  }

  .sidebar__wrap {
    box-sizing: content-box;

    .sidebar__item {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      position: relative;

      @include web {
        padding-left: calc(3.5rem/2);
      }

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
        font-size: 1.5rem;
        margin: 1rem 0.5rem 1rem 0rem;
        color: aquamarine;
        font-weight: bold;
        transition: margin 0.8s ease;
      }

      /* text */
      :nth-child(2) {
        font-size: 1.2rem;
        font-weight: bold;
        visibility: hidden;
        opacity: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: all 0.5s ease;

        @include web {
          font-size: 1.5rem;
        }
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
  width: 15rem;

  .sidebar__avatar {
    img {
      width: 2.8rem;

      @include web {
        width: 8rem;
      }
    }
  }
  .sidebar__wrap {
    .sidebar__item {
      :first-child {
        margin: 1rem;
      }

      :nth-child(2) {
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

</style>
