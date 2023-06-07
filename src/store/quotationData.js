import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuotationDataStore = defineStore('quotationData', () => {
  // Quotation
  const quotation = ref('')
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
