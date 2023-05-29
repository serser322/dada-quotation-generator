<script setup>
import { useRouter } from 'vue-router'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

// Button router
const router = useRouter()
const toQuoteInput = () => {
  router.push({ name: 'QuoteInput' })
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
          src="../assets/FvsC3udaUAMI4Jc.jpg"
          alt=""
        >
      </div>

      <div class="btn__group">
        <BaseButton>
          下載
        </BaseButton>

        <BaseButton @click="toQuoteInput">
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
    width: 30rem;
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
