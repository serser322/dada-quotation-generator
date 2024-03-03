import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

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
  const exportStyle = reactive({
    fontStyle: 'Noto Sans CJK TC',
    fontColor: 'white',
    hasTextShadow: false,
    backgroundImage: 'image_base'
  })

  const setExportStyle = (type, value) => {
    exportStyle[type] = value

    if (value === 'true') exportStyle[type] = true
    if (value === 'false') exportStyle[type] = false
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

  /* Style Options **/
  const styleOptions = ref([
    {
      title: '字型',
      type: 'fontStyle',
      options: [
        {
          text: '預設',
          value: 'Noto Sans CJK TC',
          hint: '誠心建議'
        },
        {
          text: '酷酷新細明體',
          value: 'PMingLiU'
        },
        {
          text: '炫炮雞尾酒 (六字型混搭)',
          value: 'mixStyle'
        }
      ]
    },
    {
      title: '文字顏色',
      type: 'fontColor',
      options: [
        {
          text: '預設',
          value: 'white',
          hint: '強烈建議'
        },
        {
          text: '華麗彩虹色',
          value: 'rainbow'
        },
        {
          text: '水晶寶寶缸 (七彩混搭)',
          value: 'randomColor'
        }
      ]
    },
    {
      title: '文字陰影',
      type: 'hasTextShadow',
      options: [
        {
          text: '無陰影',
          value: false,
          hint: '建議'
        },
        {
          text: '有陰影才有型',
          value: true
        }
      ]
    },
    {
      title: '背景圖',
      type: 'backgroundImage',
      options: [
        {
          text: '預設',
          value: 'image_base',
          hint: '下跪建議'
        },
        {
          text: '魅力彩虹',
          value: 'image_base_rainbow_1'
        },
        {
          text: '魔幻彩虹',
          value: 'image_base_rainbow_2'
        },
        {
          text: '絢麗彩虹',
          value: 'image_base_rainbow_3'
        }
      ]
    }
  ])

  return {
    isSidebarOpen,
    setSidebarOpen,
    headerLoadDown,
    setHeaderLoadDown,
    quotation,
    setQuotation,
    date,
    setDate,
    exportStyle,
    setExportStyle,
    image,
    setImage,
    sourceUrl,
    setSourceUrl,
    shortUrl,
    setShortUrl,
    finalImageB64,
    setFinalImageB64,
    formatDate,
    styleOptions
  }
})
