<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseLoader from '../components/BaseLoader.vue'
import BaseStepper from '../components/BaseStepper.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

// Loading (為避免一次load 16張圖時間過久，分兩次顯示)
const firstHalfImagesNum = ref(0)
const secondHalfImagesNum = ref(0)
const isFirstHalfLoadDown = computed(() => firstHalfImagesNum.value === 6)
const isSecondHalfLoadDown = computed(() => secondHalfImagesNum.value === 10)
const firstHalfImagesLoad = () => {
  firstHalfImagesNum.value++
}
const secondHalfImagesLoad = () => {
  secondHalfImagesNum.value++
}

const quotationStore = useQuotationDataStore()
const selectImage = (event) => {
  document.querySelectorAll('.image').forEach(element => {
    element.classList.remove('selected')
  })
  event.target.parentElement.classList.add('selected')
  quotationStore.setImage(event.target.dataset.img)
  isValid.value = true
}

// 標記已選擇的立繪
const { image } = storeToRefs(quotationStore)
onMounted(() => {
  document.querySelectorAll('.image').forEach(element => {
    if (element.firstChild.dataset.img === image.value) {
      element.classList.add('selected')
    }
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

</script>

<template>
  <main>
    <BaseStepper page="imagesSelection" />
    <BaseLoader v-show="!isFirstHalfLoadDown" />
    <BaseCard v-show="isFirstHalfLoadDown">
      <h2 for="">
        請選擇此名言圖的立繪：
      </h2>
      <div
        class="invalid__text"
        :class="isValid ? 'hidden' : 'showHint'"
      >
        提示：需選擇一張立繪
      </div>
      <div
        class="images"
        :class="{ invalid__border: !isValid, invalid__border__space: isValid }"
      >
        <!-- 為避免一次load 16張圖時間過久，前6張load完先顯示 -->
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2023-04-06_01h59_42.png"
            alt=""
            data-img="vts-2023-04-06_01h59_42.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2023-04-06_17h45_46.png"
            alt=""
            data-img="vts-2023-04-06_17h45_46.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2023-04-06_17h47_23.png"
            alt=""
            data-img="vts-2023-04-06_17h47_23.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2023-04-06_17h40_52.png"
            alt=""
            data-img="vts-2023-04-06_17h40_52.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2023-04-06_17h42_42.png"
            alt=""
            data-img="vts-2023-04-06_17h42_42.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <div
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-11-02_06h44_01.png"
            alt=""
            data-img="vts-2022-11-02_06h44_01.png"
            @load="firstHalfImagesLoad"
          >
        </div>
        <!-- 繼續等待後10張load -->
        <div
          v-if="!isSecondHalfLoadDown"
          class="img__loader"
        >
          <BaseLoader />
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-11-02_06h54_15.png"
            alt=""
            data-img="vts-2022-11-02_06h54_15.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-11-02_06h49_12.png"
            alt=""
            data-img="vts-2022-11-02_06h49_12.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-11-02_06h48_44.png"
            alt=""
            data-img="vts-2022-11-02_06h48_44.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-02-22_01h03_51.png"
            alt=""
            data-img="vts-2022-02-22_01h03_51.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2022-01-24_06h58_47.png"
            alt=""
            data-img="vts-2022-01-24_06h58_47.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2021-10-30_20h51_41.png"
            alt=""
            data-img="vts-2021-10-30_20h51_41.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2021-11-15_18h23_24.png"
            alt=""
            data-img="vts-2021-11-15_18h23_24.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2021-12-25_22h52_13.png"
            alt=""
            data-img="vts-2021-12-25_22h52_13.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2021-12-24_04h22_39.png"
            alt=""
            data-img="vts-2021-12-24_04h22_39.png"
            @load="secondHalfImagesLoad"
          >
        </div>
        <div
          v-show="isSecondHalfLoadDown"
          class="image"
          @click="selectImage($event)"
        >
          <img
            src="../assets/images/vts-2021-12-26_13h12_24.png"
            alt=""
            data-img="vts-2021-12-26_13h12_24.png"
            @load="secondHalfImagesLoad"
          >
        </div>
      </div>
    </BaseCard>
    <div
      v-show="isFirstHalfLoadDown"
      class="btn__group"
    >
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
  color: var(--secondary-yellow);
  font-size: var(--title-font-size);
}

.invalid__text {
  font-size: var(--invalid-text-size);
  color: red;
  visibility: visible;
  margin-top: -10px;
  margin-bottom: 10px;
  position: relative;

  &.hidden {
    /* visibility: hidden; */
    opacity: 0%;
    animation: hiddenAnimate 0.3s ease-out forwards;
  }

  &.showHint {
    opacity: 0;
    animation: showHintAnimate 0.3s ease-out forwards;
  }

  @keyframes showHintAnimate {
    0% {
      opacity: 0%;
      bottom: 10px;
    }

    100% {
      opacity: 100%;
      bottom: 0;
    }
  }

  @keyframes hiddenAnimate {
    0% {
      opacity: 100%;
      bottom: 0px;
    }

    100% {
      opacity: 0%;
      bottom: 10px;
    }
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

  .image {
    width: 7rem;
    height: 7rem;
    margin: 0.2rem;
    border: 3px solid white;
    border-radius: 1rem;
    background-color: rgb(0, 0, 0, 0.5);
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
      border: 5px solid var(--primary-yellow);
      transform: scale(1.1);
      transition: transform 0.4s ease-out;
    }

    &:active {
      border: 5px solid salmon;
    }
  }
}

.selected {
  border: 5px solid var(--primary-yellow);
  box-shadow: 0 0 20px 2px var(--primary-yellow);

  &:active {
    border: 5px solid var(--primary-yellow);
  }
}

.btn__group {
  display: flex;
  flex-direction: column-reverse;
}

@media (min-width: 576px) {
  h2 {
    font-size: var(--title-font-size-pad);
  }

  .invalid__text {
    font-size: var(--invalid-text-size-pad);
  }

  .images {
    .image {
      width: 9rem;
      height: 9rem;
      margin: 0.4rem;
    }
  }

  .btn__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  .images {
    .image {
      width: 11rem;
      height: 11rem;
      margin: 0.5rem;
    }
  }
}

@media (min-width: 992px) {
  .images {
    .image {
      width: 12rem;
      height: 12rem;
      margin: 0.6rem;
    }
  }
}

.img__loader {
  width: 9rem;
  height: 9rem;
  /* margin: 0.4rem; */

  @media (min-width: 768px) {
    width: 11rem;
    height: 11rem;
    margin: 0.5rem;
  }

  @media (min-width: 992px) {
    width: 12rem;
    height: 12rem;
    margin: 0.6rem;
  }
}
</style>
