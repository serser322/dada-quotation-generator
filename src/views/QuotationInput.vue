<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const quotationStore = useQuotationDataStore()

// Quotation input
const { quotation, date } = storeToRefs(quotationStore)
const updateQuotation = (event) => {
  quotationStore.setQuotation(event.target.value.trim())
}

// Date input
const updateDate = quotationStore.setDate

// const format = (date) => {
//   const day = date.getDate()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   return `${year}/${month}/${day}`
// }

// Button router
const router = useRouter()
const toImageSelection = () => {
  router.push({ name: 'ImagesSelection' })
}
</script>

<template>
  <main>
    <BaseCard>
      <div class="quotation_input">
        <h2 for="">
          請輸入灰妲曾說過的名言：
        </h2>
        <input
          type="text"
          :value="quotation"
          @change="updateQuotation"
        >
      </div>
      <div class="quotation_date">
        <h2>
          請選擇此名言金句誕生日期：
        </h2>
        <div class="date_input">
          <VueDatePicker
            :model-value="date"
            :enable-time-picker="false"
            auto-apply
            locale="zh-tw"
            placeholder="請選擇日期"
            dark
            :format="quotationStore.formatDate(date, '/')"
            :day-names="['一', '二', '三', '四', '五', '六', '日']"
            @update:model-value="updateDate"
          >
            <template #dp-input="{ value }">
              <input
                class="date"
                type="text"
                :value="value"
                placeholder="請選擇日期"
              >
              <i class="material-symbols-outlined">
                calendar_month
              </i>
            </template>
          </VueDatePicker>
        </div>
      </div>
    </BaseCard>
    <BaseButton
      class="btn-next"
      @click="toImageSelection"
    >
      下一步
    </BaseButton>
  </main>
</template>

<style lang="scss" scoped>
input[type=text] {
  width: 100%;
  font-size: 1.5rem;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid white;

  &:focus {
    outline: 0;
    border-bottom: 3px solid white;
  }
}

.quotation_date {
  margin-top: 4rem;

  .date_input {
    width: 30%;

    .date {
      padding-left: 2.5rem;
    }

    .material-symbols-outlined {
      position: absolute;
      top: 1px;
      left: 0;
    }
  }
}

.btn-next {
  margin-left: auto
}
</style>
