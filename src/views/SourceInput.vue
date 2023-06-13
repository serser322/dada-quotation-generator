<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import mergeImages from 'merge-images'

const isSelected = ref(true)
const image2 = ref(null)
const canvasEl = ref(null)
const canvasImg = ref(null)

// Source input
const quotationStore = useQuotationDataStore()
const { sourceUrl, quotation, date, formatDate } = storeToRefs(quotationStore)
const updateSource = (event) => {
  quotationStore.setSourceUrl(event.target.value)
}

// Make Image
// const router = useRouter()
const makeImage = async () => {
  const baseImage = new URL('./../assets/images/image_base.jpg', import.meta.url).href // 尺寸 1080 * 574
  const dadaImage = new URL('./../assets/images/vts-2023-04-06_17h45_46.png', import.meta.url).href
  const frameImage = new URL('./../assets/images/frame.png', import.meta.url).href
  const quotationImage = new URL(getTextImage('quotation'), import.meta.url).href
  const nameImage = new URL(getTextImage('name'), import.meta.url).href

  const b64 = await mergeImages([
    baseImage,
    { src: dadaImage, x: 0, y: 44 },
    frameImage,
    { src: quotationImage, x: 480, y: 0 }, // 506px為canvas圖，距離圖左邊界的距離
    { src: nameImage, x: 480, y: 0 }
  ])

  image2.value.src = b64

  // router.push({ name: 'ImagesSelection' })
}

const getTextImage = (textContent) => {
  const canvasContext = canvasEl.value.getContext('2d')
  // 先清除畫布
  canvasContext.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  canvasContext.fillStyle = 'white'

  // 輔助線
  canvasContext.strokeStyle = 'yellow'
  canvasContext.lineWidth = 2
  canvasContext.strokeRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  if (textContent === 'quotation') {
    canvasContext.font = 'bold 45px Noto Sans CJK TC'
    canvasContext.fillText('哈囉', 50, canvasEl.value.height / 2)
  }

  if (textContent === 'name') {
    canvasContext.font = '30px Noto Sans CJK TC'
    const dateString = quotationStore.formatDate(date.value, ' . ')
    canvasContext.fillText(`── 灰妲    ${dateString}`, 200, 500)
  }
  return canvasContext.canvas.toDataURL()
}

const setTextOnImage = (text) => {
  // const wordsPerLine = 10
  // const maxLine = 6
  const textLines = text.slice()
  console.log(text.match(/.{1,10}/g))
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
    <img
      ref="canvasImg"
      class=""
    >
    <BaseCard>
      <div class="source__input">
        <img
          ref="image2"
          class="image2"
        >
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
          :value="sourceUrl"
          :placeholder="isSelected ? '如：該集youtube直播連結(含秒數連結更佳)、twitter文連結等' : '無'"
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
      <BaseButton @click="makeImage">
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
    background-color: rgba(255, 255, 255, 0.5);
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
