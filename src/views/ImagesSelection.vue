<script setup>
// import { ref } from 'vue'
import BaseCard from '../components/BaseCard.vue'

// const imagesData = ref([

// ])
</script>

<template>
  <main class="images-selection">
    <BaseCard>
      <h2 for="">
        請選擇此名言圖上的立繪：
      </h2>
      <div class="images">
        <div>
          <img
            src="../assets/dada.png"
            alt=""
          >
        </div>
      </div>
    </BaseCard>
  </main>
</template>

<style lang="scss" scoped>

.images {
  div {
    width: 12rem;
    border: 3px solid white;
    border-radius: 1rem;
    background-color: rgb(122, 122, 122);

    img {
      width: 100%;
    }
  }
}

</style>
