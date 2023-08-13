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
  position: relative;
  top: 30px;
  opacity: 0%;
  animation: cardAnimate 0.6s ease-in-out 1s forwards;

  @keyframes cardAnimate {
    0% {
      top: 30px;
      opacity: 0%;
    }

    100% {
      top: 0px;
      opacity: 100%;
    }
  }

}

@media (min-width: 576px) {
  .card {
    padding: 2.5rem;
  }
}
</style>
