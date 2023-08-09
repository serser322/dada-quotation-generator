<script setup>
import { saveAs } from 'file-saver'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import BaseStepper from '../components/BaseStepper.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { storeToRefs } from 'pinia'

// Source input
const quotationStore = useQuotationDataStore()
const { shortUrl, finalImageB64 } = storeToRefs(quotationStore)

// Copy
const shortUrlInput = ref(null)
const copyToClipboard = () => {
  navigator.clipboard.writeText(shortUrlInput.value.value)
}

// Button router
const router = useRouter()
const toQuotationInput = () => {
  router.push({ name: 'QuotationInput' })
}

// Download
const download = () => {
  saveAs(finalImageB64.value, '灰妲名言圖.png')
}
</script>

<template>
  <main>
    <BaseStepper
      page="finalPage"
    />
    <BaseCard>
      <div class="final">
        <div>
          <h2 for="">
            名言圖完成&下載：
          </h2>
          <div class="final__image">
            <img
              ref="finalImage"
              :src="finalImageB64"
              alt=""
            >
          </div>

          <div
            v-if="shortUrl"
            class="final__short__url"
          >
            <label for="shortUrl">
              名言出處短網址：
            </label>
            <input
              ref="shortUrlInput"
              type="text"
              :value="shortUrl"
              name="shortUrl"
              readonly
            >
            <button
              type="button"
              @click="copyToClipboard"
            >
              <span class="material-symbols-outlined">
                content_copy
              </span>
              <span>複製</span>
            </button>
          </div>
        </div>
      </div>
      <div class="btn__group">
        <BaseButton @click="download">
          <span class="material-symbols-outlined">
            download
          </span>
          下載
        </BaseButton>

        <BaseButton @click="toQuotationInput">
          <span class="material-symbols-outlined">
            replay
          </span>
          重新製作
        </BaseButton>
      </div>
    </BaseCard>
  </main>
</template>

<style lang='scss' scoped>
.final {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: var(--title-font-size);
  }
  .final__image {
    margin-top: 2rem;

    img {
      width: 100%;
      display: block;
    }
  }
}

.final__short__url {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0 2rem 0;

  label[for=shortUrl] {
    font-weight: bold;
    padding-bottom: 2px;
  }

  input[type=text] {
    border: 2px solid white;
    width: 9.5rem;
    font-weight: 600;
  }

  button[type=button] {
    display: flex;
    align-items: center;
    border: 0;
    border-radius: 5px;
    background-color: var(--primary-color);
    margin-left: 10px;
    color: var(--text-color);
    cursor: pointer;

    span {
      font-weight: bold;
      padding: 2px;
    }

    span:first-child {
      font-size: 1.1rem
    }

    &:hover {
      background-color: gold;
    }

    &:active {
      color: white;
      background-color: salmon;
    }
  }

}

@media (min-width: 576px) {
  .final {
    h2 {
      font-size: var(--title-font-size-pad);
    }
  }

  .btn__group {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
}

@media (min-width: 992px) {
  .final__image {
    img {
      max-width: 45rem;
    }
  }
}
</style>
