<script setup>
import { useQuotationDataStore } from '../store/quotationData'
const quotationStore = useQuotationDataStore()
const openSidebar = () => {
  console.log(123123)
  quotationStore.setSidebarOpen(true)
}
</script>

<template>
  <header>
    <div
      class="header__sidebar__toggler"
      @click="openSidebar"
    >
      <span class="material-symbols-outlined">
        menu
      </span>
    </div>

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
  justify-content: center;
  width: 100%;
  height: 8rem;
  background-color: var(--primary-color);

  .header__sidebar__toggler {
    position: absolute;
    left: 10px;
    top: 50px;

    span.material-symbols-outlined {
      border: 1px solid white;
      width: 25px;
      height: 25px;

      font-size: 25px;
      font-weight: 600;
      /* border-radius: 0 5px 5px 0; */
      background-color: var(--sidebar-background-color);
    }
  }

  .header__logo {
    display: none;
  }

  .header__image {
    height: auto;

    img {
      height: 100%;
    }
  }

  @media (min-width:576px) {

    justify-content: space-between;
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
