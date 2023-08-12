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
  /* min-height: 25rem; */
  background-color: #fff;
  margin: 0 auto 0 auto;
  padding: 2rem 1.5rem;
  border-radius: 2rem;
  box-shadow: var(--element-shadow);

}

@media (min-width: 576px) {
  .card {
    padding: 2.5rem;
  }
}
</style>
