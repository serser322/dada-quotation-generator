<script setup>

</script>

<template>
  <div class="btn">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.btn {
  width: 10rem;
  /* height: 5rem; */
  padding: 0.8rem 0;
  border: 6px solid white;
  border-radius: 0.8rem;
  background-color: rgb(255, 195, 98);
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-left: auto;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: aquamarine;
  }
}
</style>
