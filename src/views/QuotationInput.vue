<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import sweetAlert from 'sweetalert2'
import dadaImage1 from '../assets/images/dada_alert1.png'
import dadaImage2 from '../assets/images/dada_alert2.png'
import dadaImage3 from '../assets/images/dada_alert3.png'
import dadaImage4 from '../assets/images/dada_alert4.png'
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
  exportStyle,
  styleOptions
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
const styleSelect = reactive(exportStyle)
const setStyleSelect = (event, type) => {
  quotationStore.setExportStyle(type, event.target.value)
}

// Style alert setting
const styleNameList = ref([])
const styleNum = computed(() => styleNameList.value.length)

const styleAlertConfig = computed(() => {
  const styleString = styleNameList.value.join('、')

  if (!styleNum.value) return {}

  const baseConfig = {
    imageUrl: dadaImage1,
    imageWidth: 150,
    showCloseButton: true,
    showCancelButton: true,
    allowOutsideClick: false,
    confirmButtonColor: '#fa9b02',
    title: '你要確定欸!?',
    html: `
    <div>
      你確定要套用特殊風格<strong>${styleString}</strong>？？
    <div>
    <small>(灰妲在<a href='https://www.youtube.com/live/l67iajGSTPA?si=MRNvbz4auvkuu9sL&t=9522'>剪輯教學台</a>好像不是這樣教的...)
    </small>`,
    confirmButtonText: '確定套用，滿滿感動',
    cancelButtonText: '返回重選'
  }

  if (styleNum.value === 1) {
    return {
      ...baseConfig
    }
  } else if (styleNum.value === 2) {
    return {
      ...baseConfig,
      imageUrl: dadaImage2,
      title: '美術老師即將暈厥...',
      confirmButtonText: '確定套用，老師保重',
      cancelButtonText: '好，我重選'
    }
  } else if (styleNum.value === 3) {
    return {
      ...baseConfig,
      imageUrl: dadaImage3,
      title: '你4不4想讓大家中風!?',
      confirmButtonText: '確定套用，一起中風',
      cancelButtonText: '我錯了，我再重選'
    }
  } else {
    return {
      ...baseConfig,
      imageUrl: dadaImage4,
      title: '你是不是想報復社會!?',
      confirmButtonText: '堅持美學，報復社會',
      cancelButtonText: '對不起社會，我再重選'
    }
  }
})

const getStyleNameList = () => {
  styleNameList.value = []
  styleOptions.value.forEach((item, index) => {
    if (exportStyle.value[item.type] !== item.options[0].value) {
      const selection = styleOptions.value[index].options.find(option => exportStyle.value[item.type] === option.value)
      styleNameList.value.push(selection.text)
    }
  })
}

// Button router
const router = useRouter()
const toImageSelection = async () => {
  validateQuotation(quotation.value)
  hasDate.value && validateDate(date.value)
  if ((isInputValid.value || isTextareaValid.value) && isDateValid.value) {
    getStyleNameList()

    !styleNum.value && router.push({ name: 'ImagesSelection' })

    if (styleNum.value) {
      const { isConfirmed } = await sweetAlert.fire({ ...styleAlertConfig.value })

      isConfirmed && router.push({ name: 'ImagesSelection' })
    }
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
              <div
                v-for="item in styleOptions"
                :key="item.title"
              >
                <div class="subtitle">
                  {{ item.title }}
                </div>
                <div class="options">
                  <div
                    v-for="option in item.options"
                    :key="option.value"
                  >
                    <input
                      :id="option.value"
                      v-model="styleSelect[item.type]"
                      type="radio"
                      :value="option.value"
                      @change="setStyleSelect($event, item.type)"
                    >
                    <label :for="option.value">
                      {{ option.text }}
                      <small v-if="option.hint">({{ option.hint }})</small>
                    </label>
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
          grid-template-columns: 8.8rem 8.8rem auto;
        }

        &:nth-child(4) {
          .options {

            grid-template-columns: 8.8rem 8.8rem 8.8rem auto;
          }
        }
      }
    }
  }
}
</style>
