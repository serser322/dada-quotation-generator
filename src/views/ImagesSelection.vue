<script setup>
// import { ref } from 'vue'
import BaseCard from '../components/BaseCard.vue'

const imagesData = ([
  {
    imagePath: '../assets/images/vts-2023-04-06_01h59_42.png'
  },
  {
    imagePath: '../assets/images/vts-2023-04-06_17h45_46.png'
  },
  {
    imagePath: '../assets/images/vts-2023-04-06_17h47_23.png'
  },
  {
    imagePath: '../assets/images/vts-2023-04-06_17h40_52.png'
  },
  {
    imagePath: '../assets/images/vts-2022-11-02_06h36_59.png'
  },
  {
    imagePath: '../assets/images/vts-2022-11-02_06h54_15.png'
  },
  {
    imagePath: '../assets/images/vts-2022-02-22_01h01_24.png'
  },
  {
    imagePath: '../assets/images/vts-2021-10-30_20h51_41.png'
  },
  {
    imagePath: '../assets/images/vts-2022-04-02_11h58_58.png'
  },
  {
    imagePath: '../assets/images/vts-2021-10-03_14h23_55.png'
  },
  {
    imagePath: '../assets/images/vts-2021-12-24_04h22_39.png'
  },
  {
    imagePath: '../assets/images/vts-2021-12-26_13h12_24.png'
  }
])

const getImgUrl = function (path) {
  return new URL(path, import.meta.url).href
}

</script>

<template>
  <main class="images-selection">
    <BaseCard>
      <h2 for="">
        請選擇此名言圖上的立繪：
      </h2>
      <div class="images">
        <div
          v-for="img in imagesData"
          :key="img"
        >
          <img
            :src="getImgUrl(img.imagePath)"
            alt=""
          >
        </div>
      </div>
    </BaseCard>
  </main>
</template>

<style lang="scss" scoped>

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  /* overflow: auto; */

  div {
    width: 12rem;
    border: 3px solid white;
    border-radius: 1rem;
    background-color: rgb(122, 122, 122);
    margin:0.5rem;

    img {
      width: 100%;
    }
  }
}

</style>
