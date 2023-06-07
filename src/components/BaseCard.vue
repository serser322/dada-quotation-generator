<script setup>

</script>

<template>
  <div class="card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 100%;
  min-height: 25rem;
  background-color: rgb(112, 201, 223);
  margin: 0 auto 0 auto;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 3px 3px 3px rgb(0, 0, 0, 0.5);

  @media (min-width: 992px) {

  }
}
</style>
