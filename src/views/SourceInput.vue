<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import mergeImages from 'merge-images'

const router = useRouter()
const isSelected = ref(true)
const canvasEl = ref(null)
const loading = ref(false)

// Source input
const quotationStore = useQuotationDataStore()
const { sourceUrl, quotation, image, date, shortUrl } = storeToRefs(quotationStore)
const updateSource = (event) => {
  quotationStore.setSourceUrl(event.target.value)
}

// 回上頁 (照片選擇頁)
const toImageSelection = () => {
  router.push({ name: 'ImagesSelection' })
}

// 名言圖合成製作
const makeImage = async () => {
  loading.value = true

  // 取得短網址
  await setShortUrl(sourceUrl.value)

  // 取得圖片
  const baseImage = new URL('./../assets/images/image_base.jpg', import.meta.url).href // 尺寸 1080 * 574
  const dadaImage = new URL(dadaImagePath.value, import.meta.url).href
  const frameImage = new URL('./../assets/images/frame.png', import.meta.url).href
  const quotationImage = new URL(getTextImage('quotation'), import.meta.url).href
  const nameImage = new URL(getTextImage('name'), import.meta.url).href
  const sourceUrlImage = new URL(getTextImage('shortUrl'), import.meta.url).href

  // 合成圖片
  const b64 = await mergeImages([
    baseImage,
    { src: dadaImage, x: 0, y: 44 },
    frameImage,
    { src: quotationImage, x: 480, y: 0 }, // 506px為canvas圖，距離圖左邊界的距離
    { src: nameImage, x: 480, y: 0 },
    { src: sourceUrlImage, x: 0, y: 0 }
  ])

  loading.value = true

  // 儲存合成圖
  quotationStore.setFinalImageB64(b64)
  // 到下一頁
  router.push({ name: 'FinalPage' })
}

const dadaImagePath = computed(() => `./../assets/images/${image.value}`)

const getTextImage = (textContent) => {
  const canvasContext = canvasEl.value.getContext('2d')
  // 先清除畫布
  canvasContext.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  // 輔助線
  // canvasContext.strokeStyle = 'yellow'
  // canvasContext.lineWidth = 2
  // canvasContext.strokeRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  canvasContext.fillStyle = 'white'

  if (textContent === 'quotation') {
    setTextOnImage(quotation.value, canvasContext)
  }

  // 署名字串
  if (textContent === 'name') {
    canvasContext.font = '30px Noto Sans CJK TC'
    const dateString = quotationStore.formatDate(date.value, ' . ')
    canvasContext.fillText(`── 灰妲    ${dateString}`, 200, 460)
  }

  // 來源短網址字串
  if (textContent === 'shortUrl') {
    canvasContext.fillStyle = 'black'
    canvasContext.font = '500 15px Noto Sans CJK TC'
    canvasContext.fillText(`名言來源：${isSelected.value ? shortUrl.value : ''}`, 16, 571)
  }

  return canvasContext.canvas.toDataURL()
}

const setTextOnImage = (text, canvas) => {
  // const maxLine = 5
  // 需驗證是否超過5行

  canvas.font = 'bold 40px Noto Sans CJK TC'
  const textArray = convertToFull(text).match(/.{1,12}/g) // 先轉為全形字體，而後每12字組成一字串，再依序放入陣列中
  const lineHeight = (canvas.measureText(textArray[0]).fontBoundingBoxAscent + canvas.measureText(textArray[0]).fontBoundingBoxDescent) * 1.3 // *1.3行高
  const totalLines = textArray.length
  const startYPosition = (canvasEl.value.height - totalLines * lineHeight) / 2 + 10 // 找出能將文字置中於畫布上的Y軸位置，再+10稍微調整位置

  // 若字體僅一行，水平置中
  if (totalLines === 1) {
    const textWidth = canvas.measureText(textArray[0]).width
    canvas.fillText(textArray[0], (canvasEl.value.width - textWidth) / 2 - 20, startYPosition)
  }

  // 超過一行，多行排列
  if (totalLines > 1) {
    textArray.forEach((element, i) => {
      canvas.fillText(element, 20, startYPosition + i * lineHeight) // 50為x軸位置(留白)
    })
  }
}

// 轉為全形字體
const convertToFull = (text) => text.replace(/[!-~]/g, matchedChar => String.fromCharCode(matchedChar.charCodeAt(0) + 0xfee0))

// 建立短網址，並儲存之
const setShortUrl = async (originUrl) => {
  // URL Shortener Service API提供之 url 與 options 設置
  const url = 'https://url-shortener-service.p.rapidapi.com/shorten'
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'a53c08d88bmsheaa4874a715c1a1p155050jsnd069bc6d9507',
      'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
    },
    body: new URLSearchParams({
      url: originUrl
    })
  }
  try {
    const response = await fetch(url, options)
    const result = await response.json()
    const shortUrl = result.result_url.replace('\\', '').replace('https://', '') // 去掉字串中的'\'，也為求簡潔，去掉開頭'https://
    quotationStore.setShortUrl(shortUrl)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <main>
    <canvas
      ref="canvasEl"
      class="hide"
      width="600"
      height="574"
      style="border: 3px solid red"
    />
    <BaseCard>
      <div class="source__input">
        <div class="title">
          <h2 for="./../assets/images/vts-2023-04-06_17h47_23.png">
            請輸入該句名言出處：
          </h2>
          <div>
            <input
              id="hasSource"
              v-model="isSelected"
              type="checkbox"
            >
            <label for="hasSource">
              附上來源連結
            </label>
          </div>
        </div>
        <input
          type="text"
          :value="isSelected ? sourceUrl: '無連結'"
          :placeholder="isSelected ? '如：該集youtube直播連結(含秒數連結更佳)、twitter文連結等' : '無連結'"
          :disabled="!isSelected"
          @change="updateSource"
        >
      </div>
      <div class="info">
        <h4>此連結將自動轉為短網址，並附在圖中左下角，如下示意：</h4>
        <img
          src="../assets/FvsC3udaUAMI4Jc.jpg"
          alt=""
        >
        <ul>
          <li>附上來源連結，除證明該名言之真實性，也方便有興趣的觀眾或烤肉man，能快速輸入短連結觀看內容。</li>
          <li>短連結也會成為名言圖下載檔的檔名，以便分享。</li>
          <li>若覺得短連結影響名言圖的美觀性，或不便查找來源，也可取消勾選右上角的「附上來源連結」。</li>
        </ul>
      </div>
    </BaseCard>
    <div class="btn__group">
      <BaseButton @click="toImageSelection">
        上一步
      </BaseButton>
      <BaseButton
        :loading="loading"
        @click="makeImage"
      >
        製作名言圖
      </BaseButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black;
}

.hide {
  display:none;
}

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

  &:disabled {
    border-bottom: 2px solid gray;
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.source__input {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    #hasSource {
      accent-color: ForestGreen;
    }

    input[type=checkbox] {
      transform: scale(1.6);
      margin-right: 5px;
    }

    label[for=hasSource] {
      font-size: 1.4rem;
      font-weight: bold;
    }
  }

  input[type=text]::placeholder {
    font-size: 1rem;
  }

  input[type=text]::-webkit-input-placeholder {
    font-size: 1rem;
  }

  input[type=text]::-moz-placeholder {
    font-size: 1rem;
  }
}

.info {
  margin-top: 3rem;

  img {
    width: 30rem;
    display: block;
    margin: 3rem auto;
  }

  ul {
    li {
      margin-bottom: 1rem;
      font-weight: bold;
    }
  }
}

.btn__group {
  display: flex;
  justify-content: space-between;
}
</style>
