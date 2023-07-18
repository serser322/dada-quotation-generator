<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
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
    imageName: 'vts-2023-04-06_17h42_42.png',
    isSelected: false
  },
  // {
  //   imageName: 'vts-2022-11-02_06h44_01.png',
  //   isSelected: false
  // },
  {
    imageName: 'vts-2022-11-02_06h44_19.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-11-02_06h54_15.png',
    isSelected: false
  },

  // {
  //   imageName: 'vts-2022-11-02_06h49_47.png',
  //   isSelected: false
  // },

  {
    imageName: 'vts-2022-11-02_06h48_00.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-11-02_06h36_59.png',
    isSelected: false
  },
  {
    imageName: 'vts-2022-02-22_01h01_24.png',
    isSelected: false
  },
  // {
  //   imageName: 'vts-2022-01-27_11h59_44.png',
  //   isSelected: false
  // },
  {
    imageName: 'vts-2022-01-24_06h58_47.png',
    isSelected: false
  },
  // {
  //   imageName: 'vts-2021-11-21_13h11_03.png',
  //   isSelected: false
  // },
  {
    imageName: 'vts-2021-10-30_20h51_41.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-11-15_18h23_24.png',
    isSelected: false
  },
  {
    imageName: 'vts-2021-12-25_22h52_13.png',
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

const quotationStore = useQuotationDataStore()
const selectImage = (img) => {
  imagesData.value.forEach(image => {
    image.isSelected = false
  })
  img.isSelected = true
  quotationStore.setImage(img.imageName)
}

// 標記已選擇的立繪
const { image } = storeToRefs(quotationStore)
onMounted(() => {
  imagesData.value.forEach(img => {
    img.isSelected = (img.imageName === image.value)
  })
})

// Validate
const isValid = ref(true)
const validate = () => {
  isValid.value = !!image.value
}

// Button router
const router = useRouter()
const toQuotationInput = () => {
  router.push({ name: 'QuotationInput' })
}

const toSourceInput = () => {
  validate()
  isValid.value && router.push({ name: 'SourceInput' })
}

const getImgUrl = function (img) {
  const imgPath = '../assets/images/' + img
  return new URL(imgPath, import.meta.url).href
}
</script>

<template>
  <main>
    <BaseCard>
      <h2 for="">
        請選擇此名言圖上的立繪：
      </h2>
      <div
        class="invalid__text"
        :class="isValid ? 'hidden' : ''"
      >
        提示：需選擇一張立繪
      </div>
      <div
        class="images"
        :class="{ invalid__border: !isValid, invalid__border__space: isValid }"
      >
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
    <div class="btn__group">
      <BaseButton @click="toQuotationInput">
        <span class="material-symbols-outlined">
          arrow_back
        </span>
        上一步
      </BaseButton>
      <BaseButton @click="toSourceInput">
        下一步
        <span class="material-symbols-outlined">
          arrow_forward
        </span>
      </BaseButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
h2 {
  font-size: var(--title-font-size);
}

.invalid__text {
  font-size: 0.9rem;
  color: red;
  visibility: visible;
  margin-top: -10px;
  margin-bottom: 10px;

  &.hidden {
    visibility: hidden;
  }
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;

  &.invalid__border,
  &.invalid__border__space {
    border: 2px dashed red;
    border-radius: 2rem;
    padding: 1rem 0;
  }

  &.invalid__border__space {
    border: 2px solid transparent;
  }

  div {
    width: 7rem;
    height: 7rem;
    margin: 0.2rem;
    border: 3px solid white;
    border-radius: 1rem;
    background-color: rgb(122, 122, 122);
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

.btn__group {
  display: flex;
  flex-direction: column-reverse;
  /* justify-content: space-between; */
}

@media (min-width: 576px) {
  h2 {
    font-size: var(--title-font-size-pad);
  }

  .images {
    div {
      width: 9rem;
      height: 9rem;
      margin: 0.4rem;
    }
  }

  .btn__group {
  display: flex;
  justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .images {
    div {
      width: 11rem;
      height: 11rem;
      margin: 0.5rem;
    }
  }
}

@media (min-width: 992px) {
  .images {
    div {
      width: 12rem;
      height: 12rem;
      margin: 0.6rem;
    }
  }
}
</style>
