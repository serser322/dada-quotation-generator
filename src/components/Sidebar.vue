<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

onMounted(() => {
  isExpanded.value = window.innerWidth >= 576
})

// Router
const router = useRouter()
function toPage(routeName) {
  router.push({ name: routeName })
}

const route = useRoute()
const isQuotationInput = computed(() => route.name === 'QuotationInput')
const isImagesSelection = computed(() => route.name === 'ImagesSelection')
const isSourceInput = computed(() => route.name === 'SourceInput')
const isFinalPage = computed(() => route.name === 'FinalPage')

const isExpanded = ref(false)
const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <!-- <div
    class="sidebar__toggler"
    @click="showSidebar"
  >
    <span class="material-symbols-outlined">
      keyboard_double_arrow_right
    </span>
  </div> -->
  <nav
    class="sidebar"
    :class="{ 'sidebar-expanded': isExpanded }"
    @click="toggleSidebar"
  >
    <!-- Avatar | Start -->
    <div class="sidebar__avatar">
      <div class="avatar">
        <img
          src="../assets/images/vts-2021-10-30_20h51_41.png"
          alt=""
        >
      </div>
    </div>
    <div class="sidebar__wrapper">
      <div class="sidebar__line" />
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isQuotationInput }"
        @click.stop="toPage('QuotationInput')"
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
      <div
        class="sidebar__item"
        :class="{ 'sidebar__item-active': isFinalPage }"
        @click.stop="toPage('FinalPage')"
      >
        <span class="material-symbols-outlined">
          vertical_align_bottom
        </span>
        <div class="text-hidden">
          製作完成
        </div>
      </div>
      <div class="sidebar__line" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
/* @mixin screen-pad {
  @media (min-width: 576px) {
    @content
  }
} */

.sidebar {
  position: relative;
  width: 5rem;
  height: auto;
  min-height: 100%;
  background-color: var(--sidebar-background-color);
  color: white;
  z-index: 1;
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
  }

  /* .sidebar__toggler {
    span.material-symbols-outlined {
      position: absolute;
      width: 25px;
      right: -25px;
      width: 25px;
      height: 25px;
      font-size: 25px;
      font-weight: 600;
      border-radius: 0 5px 5px 0;
      background-color: var(--sidebar-background-color);

      @media (min-width: 576px) {
        display: none;
      }
    }
  } */

  .sidebar__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    height: 11rem;

    .avatar {
      width: 4rem;
      transition: width 0.5s ease;

      img {
        width: 100%;
        background-color: rgb(223, 191, 191);
        border: 0.1rem solid white;
        border-radius: 50%;
      }

      @media (min-width: 576px) {
        /* width: 4rem; */
      }
    }
  }

  .sidebar__wrapper {
    .sidebar__item {
      position: relative;
      z-index: 2;
      padding: 1rem 0;
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
        margin: 0.25rem 0.75rem;
        font-size: 2rem;
        color: aquamarine;
        font-weight: bold;

        @media (min-width: 576px) {
          margin: 0.25rem 1.5rem
        }
      }

      :nth-child(2) {
        font-weight: 600;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
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

  /* .sidebar__toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgb(62, 62, 62);
    transition: transform 0.3s ease-out;
  } */
}

/* Expanded on 576px above screen*/
.sidebar-expanded {
  width: 10.5rem;

  .sidebar__avatar {
    .avatar {
      width: 9.5rem;
      transition: width 0.5s ease;

      img {
        width: 100%;
      }
    }

  }

  @media (min-width: 576px) {
    width: 13rem;
  }

  .sidebar__wrapper {
    .sidebar__item {
      :first-child {}

      :nth-child(2) {
        font-size: 1.5rem;
        visibility: visible;
        opacity: 1;
      }
    }
  }

  /* .sidebar__toggle {
    transform: rotate(180deg);
  } */

}

.text-hidden {
  font-size: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}
</style>
