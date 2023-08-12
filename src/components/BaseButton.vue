<script setup>
const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <div class="btn">
    <div
      v-if="loading"
      class="loader"
    />
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  width: 100%;
  padding: 0.4rem 0;
  border: 4px solid white;
  border-radius: 0.8rem;
  background-color: var(--primary-yellow);
  text-align: center;
  font-size: 1.1rem;
  font-weight: 900;
  margin-top: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  box-shadow: var(--element-shadow);

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ffffff;
  }

  &:hover {
    cursor: pointer;
    background-color: var(--primary-red);
    box-shadow: 0 0 15px rgb(223, 87, 97, 0.5);
  }

  &:active {
    background-color: salmon;
    box-shadow: 0 0 20px rgb(223, 87, 97, 0.7);
  }
}

.loader {
  border: 5px solid #f3f3f3;
  /* Light grey */
  border-top: 5px solid #3498db;
  /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.6s linear infinite;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@media (min-width: 576px) {
  .btn {
    margin-top: 2rem;
    width: 10rem;
    border: 6px solid white;
    padding: 0.8rem 0;
    font-size: 1.4rem;
  }
}
</style>
