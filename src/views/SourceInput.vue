<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import sweetAlert from 'sweetalert2'
import BaseLoader from '../components/BaseLoader.vue'
import BaseStepper from '../components/BaseStepper.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'
import mergeImages from 'merge-images'

const router = useRouter()
const isSelected = ref(true)
const canvasEl = ref(null)
const loading = ref(false)

// Loading
const isLoadDown = ref(false)
const contentImageLoad = () => {
  isLoadDown.value = true
}

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
  validate()
  if (!isValid.value) return

  try {
    loading.value = true

    // 取得短網址
    isSelected.value && await setShortUrl(sourceUrl.value)

    // 取得圖片
    const baseImage = new URL('./../assets/images/image_base.jpg', import.meta.url).href // 尺寸 1080 * 574
    const dadaImage = new URL(dadaImagePath.value, import.meta.url).href
    const frameImage = new URL('./../assets/images/frame.png', import.meta.url).href
    const quotationImage = new URL(getTextImage('quotation'), import.meta.url).href
    const nameImage = new URL(getTextImage('name'), import.meta.url).href
    const dateImage = new URL(getTextImage('date'), import.meta.url).href
    const sourceUrlImage = new URL(getTextImage('shortUrl'), import.meta.url).href

    // 合成圖片
    const b64 = await mergeImages([
      baseImage,
      { src: dadaImage, x: 0, y: 44 },
      frameImage,
      { src: quotationImage, x: 480, y: 0 }, // 506px為canvas圖，距離圖左邊界的距離
      { src: nameImage, x: 480, y: 0 },
      { src: dateImage, x: 480, y: 0 },
      { src: sourceUrlImage, x: 0, y: 0 }
    ])

    // 儲存合成圖
    quotationStore.setFinalImageB64(b64)
    // 到下一頁
    router.push({ name: 'FinalPage' })
  } catch (error) {
    // 使用sweet alert
    const errorText = error?.error?.includes('URL is invalid') ? '輸入的網址好像無效QQ，請確認是否輸入有誤' : error
    sweetAlert.fire({
      icon: 'error',
      title: '<div style=\'display: flex; justify-content:center; align-items:center\'><span style=\'padding-right:5px\'>出錯惹</span><img width=60 src=\'src/assets/images/error_image.png\'></div>',
      text: errorText,
      confirmButtonText: '好喔！'
    })
  } finally {
    loading.value = false
  }
}

const dadaImagePath = computed(() => `./../assets/images/${image.value}`)

const getTextImage = (textContent) => {
  const canvasContext = canvasEl.value.getContext('2d')
  // 先清除畫布
  canvasContext.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height)

  canvasContext.fillStyle = 'white'

  if (textContent === 'quotation') {
    setTextOnImage(quotation.value, canvasContext)
  }

  // 署名字串
  if (textContent === 'name') {
    canvasContext.font = '37px Noto Sans CJK TC'
    canvasContext.fillText('──  灰妲', 170, 485)
  }

  // 日期字串
  if (textContent === 'date') {
    canvasContext.font = '30px Noto Sans CJK TC'
    const dateString = date.value ? quotationStore.formatDate(date.value, ' . ') : ''
    canvasContext.fillText(`${dateString}`, 370, 485)
  }

  // 來源短網址字串
  if (textContent === 'shortUrl') {
    canvasContext.fillStyle = 'black'
    canvasContext.font = '500 13px Noto Sans CJK TC'
    canvasContext.fillText(`${isSelected.value ? '名言來源：' + shortUrl.value : ''}`, 16, 571)
  }

  return canvasContext.canvas.toDataURL()

  // 輔助線
  // canvasContext.strokeStyle = 'yellow'
  // canvasContext.lineWidth = 2
  // canvasContext.strokeRect(0, 0, canvasEl.value.width, canvasEl.value.height)
}

const setTextOnImage = (text, canvas) => {
  canvas.font = 'bold 40px Noto Sans CJK TC'
  const textArray = convertToFull(text).match(/.{1,12}/g) // 先轉為全形字體，而後每12字組成一字串，再依序放入陣列中
  const lineHeight = (canvas.measureText(textArray[0]).fontBoundingBoxAscent + canvas.measureText(textArray[0]).fontBoundingBoxDescent) * 1.2 // *1.3行高
  const totalLines = textArray.length
  const startYPosition = (canvasEl.value.height - totalLines * lineHeight) / 2 + 10 // 找出能將文字置中於畫布上的Y軸位置，再+10稍微調整位置

  // 若字體僅一行，水平置中
  if (totalLines === 1) {
    const textWidth = canvas.measureText(textArray[0]).width
    canvas.fillText(textArray[0], (canvasEl.value.width - textWidth) / 2 - 20, startYPosition) // 20為x軸位置(留白)，因此計算上須扣除
  }

  // 超過一行，多行排列
  if (totalLines > 1) {
    const longestTextWidth = canvas.measureText(getLongestString(textArray)).width
    textArray.forEach((element, i) => {
      canvas.fillText(element, (canvasEl.value.width - longestTextWidth) / 2 - 20, startYPosition + i * lineHeight) // 20為x軸位置(留白)，因此計算上須扣除
    })
  }
}

// 轉為全形字體
const convertToFull = (text) => text.replace(/[!-~]/g, matchedChar => String.fromCharCode(matchedChar.charCodeAt(0) + 0xfee0))

// 找出最長字串
const getLongestString = (strArray) => {
  let longestStr = ''
  strArray.forEach(string => {
    longestStr = (string.length > longestStr.length) ? string : longestStr
  })
  return longestStr
}

// 建立短網址，並儲存之
const setShortUrl = async (originUrl) => {
  // 121~133行是 URL Shortener Service API提供之 url 與 options 設置
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
  // 打API
  const response = await fetch(url, options)
  const result = await response.json()

  if (!response.ok) throw result

  if (response.ok) {
    const shortUrl = result.result_url.replace('\\', '').replace('https://', '') // 去掉字串中的'\'，也為求簡潔，去掉開頭'https://
    quotationStore.setShortUrl(shortUrl)
  }
}

// 驗證
const isValid = ref(true)
const validate = () => {
  isValid.value = isSelected.value ? !!sourceUrl.value : true
}

</script>

<template>
  <main>
    <BaseStepper page="sourceInput" />
    <BaseLoader v-show="!isLoadDown" />
    <canvas
      ref="canvasEl"
      class="hide"
      width="600"
      height="574"
    />
    <div v-show="isLoadDown">
      <BaseCard>
        <div class="source__input">
          <div class="title">
            <h2>
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
            :value="isSelected ? sourceUrl : ''"
            :class="isValid ? '' : 'invalid'"
            :placeholder="isSelected ? '直播連結(含秒數連結佳)、推特連結等' : '無連結'"
            :disabled="!isSelected"
            @change="updateSource"
          >
          <div
            v-show="isSelected"
            class="invalid__text"
            :class="isValid ? 'hidden' : 'showHint'"
          >
            提示：如有勾選「附上來源連結」，請貼上來源連結
          </div>
          <!-- (底下div為若上方因v-show讓element消失後，所預留之空間) -->
          <div
            v-show="!isSelected"
            class="invalid__text hidden"
          >
            (預留空間)
          </div>
        </div>
        <div class="info">
          <div>此連結將自動轉為短網址，並附在圖中左下角，如下示意：</div>
          <img
            src="../assets/images/source_example.png"
            alt=""
            @load="contentImageLoad"
          >
          <ul>
            <li>附上來源連結，除證明該名言之真實性，也方便有興趣的觀眾或烤肉man，能快速輸入短連結觀看內容。</li>
            <li>若覺得短連結影響名言圖的美觀性，或不便查找來源，也可取消勾選右上角的「附上來源連結」。</li>
          </ul>
        </div>
      </BaseCard>
      <div class="btn__group">
        <BaseButton @click="toImageSelection">
          <span class="material-symbols-outlined">
            arrow_back
          </span>
          上一步
        </BaseButton>
        <BaseButton
          :loading="loading"
          @click="makeImage"
        >
          製作成圖
          <span class="material-symbols-outlined">
            arrow_forward
          </span>
        </BaseButton>
      </div>
      <div
        v-if="isSelected"
        class="invalid__hint invalid__text"
        :class="isValid ? 'hidden' : 'showHint'"
      >
        提示：如有勾選「附上來源連結」，請貼上連結，若無則取消勾選
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black;
}

.hide {
  display: none;
}

.source__input {
  .title {
    color: var(--secondary-yellow);

    h2 {
      font-size: var(--title-font-size);
    }

    #hasSource {
      accent-color: ForestGreen;
    }

    input[type=checkbox] {
      transform: scale(1.3);
      margin-right: 2px;
    }

    label[for=hasSource] {
      font-size: 1rem;
      font-weight: bold;
    }
  }
}

input[type=text] {
  margin-top: 1rem;
  width: 100%;
  font-size: var(--input-font-size);
  border: 0;
  border-bottom: 2px solid var(--secondary-yellow);
  color: var(--text-color);

  &:focus {
    outline: 0;
    border-bottom: 3px solid var(--secondary-yellow);
  }

  &.invalid {
    border-bottom: 3px solid red;
  }

  &:disabled {
    border-bottom: 2px solid gray;
    background-color: rgba(0, 0, 0, 0.06);
  }

  &::placeholder {
    color: var(--placeholder-color);
    font-size: var(--input-font-size);
  }

  &::-webkit-input-placeholder {
    font-size: var(--input-font-size);
  }
}

.info {
  color: var(--secondary-yellow);
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 800;

  img {
    width: 100%;
    display: block;
    margin: 1.5rem auto;
  }

  ul {
    padding-left: 1rem;

    li {
      margin-bottom: 1rem;
    }
  }
}

.btn__group {
  display: flex;
  flex-direction: column-reverse;
}

.invalid__text {
  font-size: var(--invalid-text-size);
  color: red;
  visibility: visible;
  margin-top: 5px;
  position: relative;

  &.hidden {
    visibility: hidden;
    /* opacity: 0%;
    animation: hiddenAnimate 0.3s ease-out forwards; */
  }

  &.showHint {
    opacity: 0;
    animation: showHintAnimate 0.3s ease-out forwards;
  }

  @keyframes showHintAnimate {
    0% {
      opacity: 0%;
      bottom: 10px;
    }

    100% {
      opacity: 100%;
      bottom: 0;
    }
  }

  @keyframes hiddenAnimate {
    0% {
      opacity: 100%;
      bottom: 0px;
    }

    100% {
      opacity: 0%;
      bottom: 10px;
    }
  }
}

.invalid__hint.invalid__text {
  float: right;
  margin-top: 1rem;
}

@media (min-width: 576px) {
  .source__input {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h2 {
        font-size: var(--title-font-size-pad);
      }

      input[type=checkbox] {
        transform: scale(1.6);
        margin-right: 5px;
      }

      label[for=hasSource] {
        font-size: 1.2rem;
      }
    }
  }

  input[type=text] {
    margin-top: 0;
    font-size: var(--input-font-size-pad);

    &::placeholder {
      font-size: var(--input-font-size-pad);
    }

    &::-webkit-input-placeholder {
      font-size: var(--input-font-size-pad);
    }
  }

  .info {
    margin-top: 2rem;
    font-size: 1.2rem;

    img {
      margin: 2rem auto;
    }
  }

  .invalid__text {
    font-size: var(--invalid-text-size-pad);
  }

  .btn__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 768px) {
  img {
    max-width: 40rem;
  }
}
</style>
