<script setup>
import { useQuotationDataStore } from '../store/quotationData'
const quotationStore = useQuotationDataStore()
const openSidebar = () => {
  quotationStore.setSidebarOpen(true)
}
</script>

<template>
  <header>
    <!-- <div
      class="header__sidebar__toggler"
      @click="openSidebar"
    >
      <span class="material-symbols-outlined">
        menu
      </span>
    </div> -->
    <div class="header__image1">
      <img
        src="../assets/header_image.png"
        alt=""
      >
    </div>

    <div class="header__logo">
      <img
        src="../assets/logo.png"
        alt=""
      >
    </div>
    <div class="header__image2">
      <img
        src="../assets/vts-2022-11-02_06h45_09.png"
        alt=""
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 7rem;
  align-items: center;
  width: 100%;
  background: url('../assets/header_background.png');
  /* .header__sidebar__toggler {
    position: absolute;
    left: 10px;
    top: 50px;

    span.material-symbols-outlined {
      border: 1px solid white;
      width: 25px;
      height: 25px;
      font-size: 25px;
      font-weight: 600;
      background-color: var(--sidebar-background-color);
    }
  } */

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
      /* width: 80%; */
      /* max-height: 7rem; */
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
        /* height: 80%; */
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
