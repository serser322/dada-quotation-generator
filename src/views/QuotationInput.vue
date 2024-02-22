<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseLoader from '../components/BaseLoader.vue'
import Carousel from '../components/Carousel.vue'
import BaseStepper from '../components/BaseStepper.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const quotationStore = useQuotationDataStore()
const MAX_CHARACTERS = 72
const MAX_LINES = 6
const MAX_CHARACTERS_PER_LINE = 12

// Loading
const isExampleImagesLoadDown = ref(false)
const isLoadDown = computed(() =>
  isExampleImagesLoadDown.value && quotationStore.headerLoadDown
)
const exampleImageLoaded = () => {
  isExampleImagesLoadDown.value = true
}

// Quotation input / textarea
const {
  quotation,
  date,
  fontColorValue,
  fontStyleValue,
  hasTextShadow,
  backgroundImageValue
} = storeToRefs(quotationStore)

const isTextarea = ref(true)

const isInputValid = ref(true)
const inputValidateText = ref('')

const validateInput = (inputText) => {
  if (inputText.length === 0) {
    isInputValid.value = false
    inputValidateText.value = '此欄位必填'
  } else if (inputText.length > MAX_CHARACTERS) {
    isInputValid.value = false
    inputValidateText.value = `因名言圖排版需求，字數請勿超過${MAX_CHARACTERS}字`
  } else {
    isInputValid.value = true
  }
}

const isTextareaValid = ref(true)
const textareaValidateText = ref('')

const validateTextarea = (inputText) => {
  const textArray = inputText.split(/\n/) // 依段落拆分為array，以便驗證
  if (inputText.length === 0) {
    isTextareaValid.value = false
    textareaValidateText.value = '此欄位必填'
  } else if (textArray.length > MAX_LINES) {
    isTextareaValid.value = false
    textareaValidateText.value = `因名言圖排版需求，行數請勿超過${MAX_LINES}行`
  } else if (isLineCharactersOver(textArray)) {
    isTextareaValid.value = false
    textareaValidateText.value = `因名言圖排版需求，每行字數請勿超過${MAX_CHARACTERS_PER_LINE}字`
  } else {
    isTextareaValid.value = true
  }
}

const validateQuotation = (input) => {
  if (!isTextarea.value) {
    validateInput(input)
  }

  if (isTextarea.value) {
    validateTextarea(input)
  }
}

const updateQuotation = (event) => {
  const inputValue = event.target.value.trim()
  validateQuotation(inputValue)
  quotationStore.setQuotation(inputValue)
}

const isLineCharactersOver = (textArray) =>
  textArray.some((text) => text.length > MAX_CHARACTERS_PER_LINE)

// Date input
const hasDate = ref(true)
const isDateValid = ref(true)
const validateDate = (data) => {
  isDateValid.value = !!data
}
const updateDate = (modelData) => {
  date.value = modelData
  hasDate.value && validateDate(modelData)
  quotationStore.setDate(modelData)
}

watch(hasDate, (newValue) => {
  if (!newValue) {
    quotationStore.setDate(null)
    isDateValid.value = true
  }
})

// Style select radio
const fontStyle = ref(fontStyleValue.value)
const setFontStyle = (event) => {
  quotationStore.setFontStyleValue(fontStyle.value)
}

const fontColor = ref(fontColorValue.value)
const setFontColor = (event) => {
  quotationStore.setFontColorValue(fontColor.value)
}

const hasShadow = ref(hasTextShadow.value)
const setHasShadow = (event) => {
  quotationStore.setHasTextShadow(hasShadow.value)
}

const backgroundImage = ref(backgroundImageValue.value)
const setBackgroundImage = (event) => {
  quotationStore.setBackgroundImageValue(backgroundImage.value)
}

// Button router
const router = useRouter()
const toImageSelection = () => {
  validateQuotation(quotation.value)
  hasDate.value && validateDate(date.value)
  if ((isInputValid.value || isTextareaValid.value) && isDateValid.value) {
    router.push({ name: 'ImagesSelection' })
  }
}
</script>

<template>
  <main>
    <BaseLoader v-if="!isLoadDown" />
    <div v-show="isLoadDown">
      <Carousel
        class="carousel"
        @on-image-loaded="exampleImageLoaded"
      />

      <BaseStepper page="quotationInput" />
      <!-- <BaseCard class="example__card">
        <div class="example">
          <div class="title">
            <h2>名言圖範例：</h2>
          </div>
          <div class="images">
            <img
              src="../assets/images/example1.png"
              @load="contentImageLoad"
            >
            <img
              src="../assets/images/example2.png"
              @load="contentImageLoad"
            >
          </div>
        </div>
      </BaseCard> -->
      <BaseCard>
        <div class="quotation">
          <div class="title">
            <div>
              <h2>請輸入灰妲曾說過的名言：</h2>
              <small v-if="!isTextarea"><b>(排版緣故，字型會轉全型；字數最多72字)</b></small>
              <small v-if="isTextarea"><b>(排版緣故，字型會轉全型；行數最多6行；每行最多12字)</b></small>
            </div>
            <div>
              <input
                id="isTextarea"
                v-model="isTextarea"
                type="checkbox"
              >
              <label for="isTextarea"> 自行分段 </label>
            </div>
          </div>
          <div
            v-if="!isTextarea"
            class="quotation__input"
          >
            <input
              type="text"
              :class="isInputValid ? '' : 'invalid'"
              :value="quotation"
              placeholder="請在此輸入名言金句..."
              @input="updateQuotation"
            >
            <div
              class="invalid__text"
              :class="isInputValid ? 'hidden' : 'showHint'"
            >
              提示：{{ inputValidateText }}
            </div>
          </div>
          <div
            v-if="isTextarea"
            class="quotation__textarea"
          >
            <textarea
              :value="quotation"
              rows="5"
              :class="isTextareaValid ? '' : 'invalid'"
              placeholder="請在此輸入名言..."
              @input="updateQuotation"
            />
            <div
              class="invalid__text"
              :class="isTextareaValid ? 'hidden' : 'showHint'"
            >
              提示：{{ textareaValidateText }}
            </div>
          </div>
        </div>

        <div class="date">
          <div class="title">
            <h2>請選擇此名言金句誕生日期：</h2>
            <div>
              <input
                id="hasDate"
                v-model="hasDate"
                type="checkbox"
              >
              <label for="hasDate"> 附上日期 </label>
            </div>
          </div>
          <div class="date__select">
            <VueDatePicker
              :model-value="hasDate ? date : null"
              :enable-time-picker="false"
              :auto-apply="true"
              locale="zh-tw"
              :dark="true"
              :format="quotationStore.formatDate(date, '/')"
              :day-names="['一', '二', '三', '四', '五', '六', '日']"
              :disabled="!hasDate"
              :teleport="true"
              @update:model-value="updateDate"
            >
              <template #dp-input="{ value }">
                <input
                  class="date__input"
                  type="text"
                  readonly
                  :value="value"
                  :placeholder="hasDate ? '請選擇日期' : '無日期'"
                  :disabled="!hasDate"
                >
                <i class="material-symbols-outlined"> calendar_month </i>
              </template>
            </VueDatePicker>
            <div
              class="invalid__text"
              :class="isDateValid ? 'hidden' : 'showHint'"
            >
              提示：此欄位必填
            </div>
          </div>
          <div class="style">
            <div class="title">
              <div>
                <h2>特殊風格選擇：</h2>
                <small>(溫馨提醒：挑選任一種，中風你和我)</small>
              </div>
            </div>

            <div class="style__select">
              <div>
                <div class="subtitle">
                  字型：
                </div>
                <div class="options">
                  <div>
                    <input
                      id="Noto Sans CJK TC"
                      v-model="fontStyle"
                      type="radio"
                      value="Noto Sans CJK TC"
                      @change="setFontStyle"
                    >
                    <label for="Noto Sans CJK TC">
                      預設
                      <small>(誠心建議)</small>
                    </label>
                  </div>
                  <div>
                    <input
                      id="PMingLiU"
                      v-model="fontStyle"
                      type="radio"
                      value="PMingLiU"
                      @change="setFontStyle"
                    >
                    <label for="PMingLiU"> 酷酷新細明體 </label>
                  </div>
                  <div>
                    <input
                      id="mixStyle"
                      v-model="fontStyle"
                      type="radio"
                      value="mixStyle"
                      @change="setFontStyle"
                    >
                    <label for="mixStyle"> 炫炮雞尾酒 (字體混搭) </label>
                  </div>
                </div>
              </div>

              <div>
                <div class="subtitle">
                  文字顏色：
                </div>
                <div class="options">
                  <div>
                    <input
                      id="white"
                      v-model="fontColor"
                      type="radio"
                      value="white"
                      @change="setFontColor"
                    >
                    <label for="white">
                      預設
                      <small>(強烈建議)</small>
                    </label>
                  </div>
                  <div>
                    <input
                      id="rainbow"
                      v-model="fontColor"
                      type="radio"
                      value="rainbow"
                      @change="setFontColor"
                    >
                    <label for="rainbow"> 華麗彩虹色 </label>
                  </div>
                  <div>
                    <input
                      id="randomColor"
                      v-model="fontColor"
                      type="radio"
                      value="randomColor"
                      @change="setFontColor"
                    >
                    <label for="randomColor">
                      水晶寶寶缸 (隨機配色)
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div class="subtitle">
                  文字陰影：
                </div>
                <div class="options">
                  <div>
                    <input
                      id="no"
                      v-model="hasShadow"
                      type="radio"
                      :value="false"
                      @change="setHasShadow"
                    >
                    <label for="no">
                      無陰影
                      <small>(建議)</small>
                    </label>
                  </div>
                  <div>
                    <input
                      id="hasShadow"
                      v-model="hasShadow"
                      type="radio"
                      :value="true"
                      @change="setHasShadow"
                    >
                    <label for="hasShadow"> 有陰影才有型 </label>
                  </div>
                </div>
              </div>

              <div>
                <div class="subtitle">
                  背景圖：
                </div>
                <div class="options">
                  <div>
                    <input
                      id="image_base"
                      v-model="backgroundImage"
                      type="radio"
                      value="image_base"
                      @change="setBackgroundImage"
                    >
                    <label for="image_base">
                      預設
                      <small>(下跪建議)</small>
                    </label>
                  </div>
                  <div>
                    <input
                      id="image_base_rainbow_1"
                      v-model="backgroundImage"
                      type="radio"
                      value="image_base_rainbow_1"
                      @change="setBackgroundImage"
                    >
                    <label for="image_base_rainbow_1"> 豪華彩虹 </label>
                  </div>
                  <div>
                    <input
                      id="image_base_rainbow_2"
                      v-model="backgroundImage"
                      type="radio"
                      value="image_base_rainbow_2"
                      @change="setBackgroundImage"
                    >
                    <label for="image_base_rainbow_2"> 魔幻彩虹 </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
      <BaseButton
        class="btn-next"
        @click="toImageSelection"
      >
        下一步
        <span class="material-symbols-outlined"> arrow_forward </span>
      </BaseButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  color: var(--secondary-yellow);
}

.carousel {
  margin-bottom: 2.5rem;
}

.quotation {
  .title {
    div {
      margin-bottom: 0.5rem;

      h2 {
        margin-bottom: 0.5rem;
      }
    }

    label[for="isTextarea"] {
      font-size: 1rem;
      font-weight: bold;
    }
  }
}

input[type="text"] {
  margin-top: 1rem;
  width: 100%;
  font-size: var(--input-font-size);
  color: var(--text-color);
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid var(--secondary-yellow);

  &:focus {
    outline: 0;
    border-bottom: 3px solid var(--secondary-yellow);
  }

  &.invalid {
    border-bottom: 3px solid red;
  }

  &::placeholder {
    color: var(--placeholder-color);
    font-size: var(--input-font-size);
  }

  &::-webkit-input-placeholder {
    font-size: var(--input-font-size);
  }
}

textarea {
  margin-top: 1rem;
  width: 100%;
  font-size: var(--input-font-size);
  color: var(--text-color);
  background-color: transparent;
  border: 2px solid var(--secondary-yellow);
  border-radius: 10px;
  padding: 10px;
  resize: none;

  &:focus {
    outline: 0;
    border: 3px solid var(--secondary-yellow);
  }

  &.invalid {
    border: 3px solid red;
  }

  &::placeholder {
    color: var(--placeholder-color);
    font-size: var(--input-font-size);
  }

  &::-webkit-input-placeholder {
    font-size: var(--input-font-size);
  }
}

input[type="checkbox"] {
  transform: scale(1.3);
  margin-right: 2px;
  accent-color: ForestGreen;
}
.date {
  margin-top: 4rem;

  .title {
    h2,
    div {
      margin-bottom: 0.5rem;
    }

    label[for="hasDate"] {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .date__select {
    width: 100%;

    .date__input {
      padding-left: 2.5rem;

      &:disabled {
        border-bottom: 2px solid gray;
        background-color: rgba(0, 0, 0, 0.06);
      }
    }

    .material-symbols-outlined {
      position: absolute;
      top: 13px;
      left: 0;
    }
  }
}

.style {
  margin-top: 4rem;
  font-weight: 600;
  .title {
    div {
      margin-bottom: 1rem;

      h2 {
        margin-bottom: 0.5rem;
      }
    }
  }
  .style__select {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    & > div {
      .subtitle {
        margin-bottom: 0.5rem;
      }

      .options {
        display: grid;
        grid-template-columns: auto;
        grid-row-gap: 10px;

        & > div {
          margin-left: 1rem;
        }

        label {
          small {
            font-size: 11px;
          }
        }
      }
    }
  }
}

h2 {
  font-size: var(--title-font-size);
}

input[type="radio"] {
  transform: scale(1.2);
  margin-right: 2px;
  accent-color: ForestGreen;

  &:checked + label {
    color: MediumSeaGreen;
  }
}

label[for="none"] {
  small {
    margin-left: 3px;
    font-size: 12px;
  }
}

.invalid__text {
  font-size: var(--invalid-text-size);
  color: red;
  visibility: visible;
  margin-top: 3px;
  position: relative;

  &.hidden {
    visibility: hidden;
  }

  &.showHint {
    opacity: 0;
    animation: showHintAnimate 0.3s ease-out forwards;
  }
}

.btn-next {
  margin-left: auto;
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

@media (min-width: 576px) {
  .quotation {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      label[for="isTextarea"] {
        font-size: 1.2rem;
      }
    }
  }

  input[type="text"],
  textarea {
    margin-top: 0;
    font-size: var(--input-font-size-pad);

    &::placeholder {
      font-size: var(--input-font-size-pad);
    }

    &::-webkit-input-placeholder {
      font-size: var(--input-font-size-pad);
    }
  }

  input[type="checkbox"] {
    transform: scale(1.6);
    margin-right: 5px;
  }
  .date {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        margin-top: 1.5rem;
      }

      label[for="hasDate"] {
        font-size: 1.2rem;
      }
    }

    .date__select {
      .material-symbols-outlined {
        position: absolute;
        top: 1px;
      }
    }
  }

  .style {
    .style__select {
      & > div {
        .options {
          grid-template-columns: 1fr 1fr ;
        }
      }
    }
  }

  h2 {
    font-size: var(--title-font-size-pad);
  }

  .invalid__text {
    font-size: var(--invalid-text-size-pad);
  }
}

@media (min-width: 768px) {
  .date {
    .date__select {
      width: 50%;
    }
  }

  .style {
    .style__select {
      & > div {
        .options {
          grid-template-columns: 9rem 9rem auto;
        }
      }
    }
  }
}
</style>
