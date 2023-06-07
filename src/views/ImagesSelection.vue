<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

const imagesData = ref([
  {
    imageName: 'vts-2023-04-06_01h59_42.png',
    isSelected: false
  },
  {
    imageName: 'vts-2023-04-06_17h45_46.png',
    isSelected: false
  },
  {
    imageName: 'vts-2023-04-06_17h47_23.png',
    isSelected: false
  },
  {
    imageName: 'vts-2023-04-06_17h40_52.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-11-02_06h36_59.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-11-02_06h54_15.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-02-22_01h01_24.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-10-30_20h51_41.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-04-02_11h58_58.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-10-03_14h23_55.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-12-24_04h22_39.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-12-26_13h12_24.png',
    isSelected: false
  }
])

const getImgUrl = function (img) {
  const imgPath = '../assets/images/' + img
  return new URL(imgPath, import.meta.url).href
}

const quotationStore = useQuotationDataStore()
const selectImage = (img) => {
  imagesData.value.forEach(image => {
    image.isSelected = false
  })
  img.isSelected = true
  quotationStore.setImage(img.imageName)
}

// Button router
const router = useRouter()
const toQuotationInput = () => {
  router.push({ name: 'QuotationInput' })
}

const toSourceInput = () => {
  router.push({ name: 'SourceInput' })
}

</script>

<template>
  <main>
    <BaseCard>
      <h2 for="">
        請選擇此名言圖上的立繪：
      </h2>
      <div class="images">
        <div
          v-for="img in imagesData"
          :key="img"
          :class="{ selected: img.isSelected }"
          @click="selectImage(img)"
        >
          <img
            :src="getImgUrl(img.imageName)"
            alt=""
          >
        </div>
      </div>
    </BaseCard>
    <div class="btn_group">
      <BaseButton @click="toQuotationInput">
        上一步
      </BaseButton>
      <BaseButton @click="toSourceInput">
        下一步
      </BaseButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;

  div {
    width: 12rem;
    height: 12rem;
    border: 3px solid white;
    border-radius: 1rem;
    background-color: rgb(122, 122, 122);
    margin: 0.5rem;
    transform: scale(1.0);
    transition: transform 0.4s ease-in-out;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      overflow: auto;
    }

    &:hover {
      cursor: pointer;
      border: 5px solid aquamarine;
      transform: scale(1.1);
      transition: transform 0.4s ease-out;
    }

    &:active {
      border: 5px solid salmon;
    }
  }

  div.selected {
    border: 5px solid darksalmon;
    box-shadow: 0 0 20px 2px darksalmon;

    &:active {
      border: 5px solid salmon;
    }
  }
}

.btn_group {
  display: flex;
  justify-content: space-between;
}
</style>
