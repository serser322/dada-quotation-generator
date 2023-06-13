import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuotationDataStore = defineStore('quotationData', () => {
  // Quotation
  const quotation = ref('今天又是有趣的連動爆發日，禮拜三想要蹭吃蹭喝的過，然後禮拜五會是一個測試企劃(主題可能會更動)，請多指教！')
  const setQuotation = (quotationInput) => {
    quotation.value = quotationInput
  }

  // Date
  const date = ref()
  const setDate = (value) => {
    date.value = value
  }

  // image
  const image = ref('')
  const setImage = (imageName) => {
    image.value = imageName
  }

  // source
  const sourceUrl = ref('')
  const setSourceUrl = (source) => {
    sourceUrl.value = source
  }

  // common functions
  const formatDate = (date, sign) => {
    if (!date) return

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${year}${sign}${month}${sign}${day}`
  }

  return {
    quotation,
    setQuotation,
    date,
    setDate,
    image,
    setImage,
    sourceUrl,
    setSourceUrl,
    formatDate
  }
})
