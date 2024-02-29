<script setup>
import { ref, computed } from 'vue'
import { useQuotationDataStore } from '../store/quotationData'
import BaseLoader from './BaseLoader.vue'

const quotationStore = useQuotationDataStore()

const headerLoadedImagesNum = ref(0)
const isLoadDown = computed(() => headerLoadedImagesNum.value === 3)
const headerImageLoad = () => {
  headerLoadedImagesNum.value++
  isLoadDown.value && quotationStore.setHeaderLoadDown(true)
}
</script>

<template>
  <div
    v-show="!isLoadDown"
    class="loader"
  >
    <BaseLoader />
  </div>
  <header v-show="isLoadDown">
    <div class="header__image1">
      <img
        src="../assets/header_image.png"
        alt=""
        @load="headerImageLoad"
      >
    </div>

    <div class="header__logo">
      <img
        src="../assets/logo.png"
        alt=""
        @load="headerImageLoad"
      >
    </div>

    <div class="header__image2">
      <img
        src="../assets/vts-2022-11-02_06h45_09.png"
        alt=""
        @load="headerImageLoad"
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
.loader {
  height: 7rem;

  @media (min-width: 576px) {
    height: 9rem;
  }

  @media (min-width: 768px) {
    height: 9.5rem;
  }

  @media (min-width: 992px) {
    height: 11rem;
  }
}

header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 7rem;
  align-items: center;
  width: 100%;
  background: url('../assets/header_background.png');

  .header__image1 {
    display: none;
  }

  .header__logo {
    height: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: logoAnimate 0.5s ease-out;

    img {
      height: 100%;
    }
  }

  .header__image2 {
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    opacity: 0;
    animation: img2Animate 0.5s ease-out 0.5s forwards;

    img {
      height: 100%;
    }
  }

  @keyframes logoAnimate {
    from {
      height: 0;
    }

    70% {
      height: 80%;
    }

    to {
      height: 75%;
    }
  }

  @keyframes img2Animate {
    0% {
      left: 200px;
      opacity: 0%;
    }

    100% {
      left: 0;
      opacity: 100%;
    }
  }

  @media (min-width:576px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 9rem;

    .header__image1 {
      height: 100%;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: end;
      margin-left: 0.5rem;
      position: relative;
      opacity: 0;
      animation: img1Animate 0.5s ease-out 0.5s forwards;

      img {
        width: 80%;
        max-width: 8rem;
      }
    }

    .header__logo {
      height: 65%;
      animation: logoAnimate 0.5s ease-out;
    }

    @keyframes img1Animate {
      0% {
        right: 200px;
        opacity: 0%;
      }

      100% {
        right: 0;
        opacity: 100%;
      }
    }

    @keyframes logoAnimate {
      0% {
        height: 0;
      }

      70% {
        height: 69%;
      }

      100% {
        height: 65%;
      }
    }

  }

  @media (min-width:768px) {
    grid-template-rows: 9.5rem;

    .header__image1 {
      margin-left: 0;

      img {
        max-width: 9rem;
      }
    }

    .header__logo {
      height: 75%;
      animation: logoAnimate 0.5s ease-out;
    }

    @keyframes logoAnimate {
      from {
        height: 0;
      }

      60% {
        height: 80%;
      }

      to {
        height: 75%;
      }
    }

  }

  @media (min-width:992px) {
    grid-template-rows: 11rem;

    .header__image1 {
      img {
        max-width: 11rem;
      }
    }

    .header__logo {
      height: 85%;
      animation: logoAnimate 0.5s ease-out;
    }

    @keyframes logoAnimate {
      0% {
        height: 0;
      }

      60% {
        height: 95%;
      }

      100% {
        height: 85%;
      }
    }

  }
}
</style>
