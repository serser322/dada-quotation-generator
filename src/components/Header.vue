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

    <div class="header__logo">
      <img
        src="../assets/名言產生器.png"
        alt=""
      >
    </div>
    <div class="header__image">
      <img
        src="../assets/vts-2022-11-02_06h45_09.png"
        alt=""
      >
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 8rem;
  background-color: var(--primary-yellow);

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

  .header__logo {
    /* display: none; */
    /* height: 5rem; */
    height: 100%;
    width: 10rem;
    display: flex;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .header__image {
    height: 100%;

    img {
      height: 100%;
    }
  }

  @media (min-width:576px) {
    height: 11rem;

    .header__logo {
      display: flex;
      align-items: center;
      width: 20rem;
      margin-left: 2rem;

      img {
        width: 100%;
      }
    }

    ;

    .header__image {
      margin-right: 2rem;
    }

  }

}
</style>
