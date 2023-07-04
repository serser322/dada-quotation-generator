<script setup>
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import { storeToRefs } from 'pinia'

// Source input
const quotationStore = useQuotationDataStore()
const { shortUrl, finalImageB64 } = storeToRefs(quotationStore)

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

.btn__group {
  display: flex;
  justify-content: center;
  gap: 2rem;
}
</style>
