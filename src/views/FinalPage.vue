<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
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
</script>

<template>
  <main>
    <BaseCard>
      <h2 for="">
        名言圖完成&下載：
      </h2>
      <div class="final__image">
        <img
          ref="finalImage"
          :src="finalImageB64"
          alt=""
          width="800"
        >
      </div>

      <div class="final__short__url">
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

      <div class="btn__group">
        <BaseButton>
          下載
        </BaseButton>

        <BaseButton @click="toQuotationInput">
          重新製作
        </BaseButton>
      </div>
    </BaseCard>
  </main>
</template>

<style lang='scss' scoped>
.final__image {
  margin-top: 3rem;

  img {
    width: 45rem;
    display: block;
    margin: 3rem auto;
  }

}

.final__short__url {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  label[for=shortUrl] {
    font-weight: bold;
    padding-bottom: 2px;
  }

  input[type=text] {
    border: 2px solid white;
    width: 8.1rem;
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

.btn__group {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
