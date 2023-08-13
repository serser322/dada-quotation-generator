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

    img {
      height: 100%;
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

      img {
        /* height: 80%; */
        width: 80%;
        max-width: 8rem;
      }
    }

    .header__logo {
      height: 65%;

      img {
        /* width: 100%; */
      }
    }

    .header__image2 {}

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

  }

}
</style>
