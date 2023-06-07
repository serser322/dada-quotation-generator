<script setup>

</script>

<template>
  <header>
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
  justify-content: space-between;
  width: 100%;
  height: 11rem;
  background-color: rgb(251, 196, 57);

  .header__logo {
    display: flex;
    align-items: center;
    width: 20rem;
    margin-left: 2rem;

    img {
      width: 100%;
    }
  }

  .header__image {
    height: auto;
    margin-right: 2rem;

    img {
      height: 100%;
    }
  }

}
</style>
