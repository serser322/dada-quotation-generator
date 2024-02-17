import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuotationDataStore = defineStore('quotationData', () => {
  // Sidebar on mobile
  const isSidebarOpen = ref(false)
  const setSidebarOpen = (sidebarStatus) => {
    isSidebarOpen.value = sidebarStatus
  }

  // Header load
  const headerLoadDown = ref(false)
  const setHeaderLoadDown = (status) => {
    headerLoadDown.value = status
  }

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

  // Style
  const hasRainbowText = ref(false)
  const setRainbowText = (checkValue) => {
    hasRainbowText.value = checkValue
  }
  const hasPMingLiU = ref(false)
  const setPMingLiU = (checkValue) => {
    hasPMingLiU.value = checkValue
  }

  // Image
  const image = ref('')
  const setImage = (imageName) => {
    image.value = imageName
  }

  // Source
  const sourceUrl = ref('')
  const setSourceUrl = (source) => {
    sourceUrl.value = source
  }

  // Source short url
  const shortUrl = ref('')
  const setShortUrl = (url) => {
    shortUrl.value = url
  }

  const finalImageB64 = ref('')
  const setFinalImageB64 = (b64) => {
    finalImageB64.value = b64
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
    isSidebarOpen,
    setSidebarOpen,
    headerLoadDown,
    setHeaderLoadDown,
    quotation,
    setQuotation,
    date,
    setDate,
    hasRainbowText,
    setRainbowText,
    hasPMingLiU,
    setPMingLiU,
    image,
    setImage,
    sourceUrl,
    setSourceUrl,
    shortUrl,
    setShortUrl,
    finalImageB64,
    setFinalImageB64,
    formatDate
  }
})
