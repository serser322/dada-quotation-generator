<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseStepper from '../components/BaseStepper.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const quotationStore = useQuotationDataStore()
const MAX_CHARACTERS = 72
const MAX_LINES = 6
const MAX_CHARACTERS_PER_LINE = 12

// Quotation input / textarea
const { quotation, date } = storeToRefs(quotationStore)
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

const isLineCharactersOver = (textArray) => textArray.some(text => text.length > MAX_CHARACTERS_PER_LINE)

// Date input
const isDateValid = ref(true)
const validateDate = (data) => {
  isDateValid.value = !!data
}
const updateDate = (modelData) => {
  date.value = modelData
  validateDate(modelData)
  quotationStore.setDate(modelData)
}

// Button router
const router = useRouter()
const toImageSelection = () => {
  validateQuotation(quotation.value)
  validateDate(date.value)
  if ((isInputValid.value || isTextareaValid.value) && isDateValid.value) { router.push({ name: 'ImagesSelection' }) }
}
</script>

<template>
  <main>
    <BaseStepper page="quotationInput" />
    <BaseCard class="example__card">
      <div class="example">
        <div class="title">
          <h2>名言圖範例：</h2>
        </div>
        <div class="images">
          <img src="../assets/images/example1.png">
          <img src="../assets/images/example2.png">
        </div>
      </div>
    </BaseCard>
    <BaseCard>
      <div class="quotation">
        <div class="title">
          <div>
            <h2>
              請輸入灰妲曾說過的名言：
            </h2>
            <small v-if="!isTextarea"><b>(排版緣故，字型會轉全型；字數最多72字)</b></small>
            <small v-if="isTextarea"><b>(排版緣故，字型會轉全型；行數最多6行；每行最多12字)</b></small>
          </div>
          <div>
            <input
              id="isTextarea"
              v-model="isTextarea"
              type="checkbox"
            >
            <label for="isTextarea">
              自行分段
            </label>
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
        <h2>
          請選擇此名言金句誕生日期：
        </h2>
        <div class="date__select">
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
                class="date__input"
                type="text"
                :value="value"
                placeholder="請選擇日期"
              >
              <i class="material-symbols-outlined">
                calendar_month
              </i>
            </template>
          </VueDatePicker>
          <div
            class="invalid__text"
            :class="isDateValid ? 'hidden' : 'showHint'"
          >
            提示：此欄位必填
          </div>
        </div>
      </div>
    </BaseCard>
    <BaseButton
      class="btn-next"
      @click="toImageSelection"
    >
      下一步
      <span class="material-symbols-outlined">
        arrow_forward
      </span>
    </BaseButton>
  </main>
</template>

<style lang="scss" scoped>
.example__card {
  margin-bottom: 1.5rem;

  .example {
    .title {
      color: var(--secondary-yellow);
      margin-bottom: 1rem;
    }

    .images {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      row-gap: 1rem;

      img {
        width: 16rem;
        box-shadow: var(--image-shadow)
      }
    }
  }
}

.quotation {
  .title {
    color: var(--secondary-yellow);

    div {
      margin-bottom: 0.5rem;

      h2 {
        margin-bottom: 0.5rem;
      }
    }

    #isTextarea {
      accent-color: ForestGreen;
    }

    input[type=checkbox] {
      transform: scale(1.3);
      margin-right: 2px;
    }

    label[for=isTextarea] {
      font-size: 1rem;
      font-weight: bold;
    }
  }
}

input[type=text] {
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

.date {
  margin-top: 4rem;

  h2 {
    color: var(--secondary-yellow)
  }

  .date__select {
    width: 100%;

    .date__input {
      padding-left: 2.5rem;
    }

    .material-symbols-outlined {
      color: var(--secondary-yellow);
      position: absolute;
      top: 13px;
      left: 0;
    }
  }
}

h2 {
  font-size: var(--title-font-size);
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
    animation: invalidTextAnimate 0.3s ease-out;
  }
}

.btn-next {
  margin-left: auto
}

@keyframes invalidTextAnimate {
  0% {
    opacity: 0;
    bottom: 10px;
  }

  100% {
    opacity: 100%;
    bottom: 0;
  }
}

@media (min-width: 576px) {
  .example__card {
    .example {
      .images {
        img {
          width: 21rem;
        }
      }
    }
  }

  .quotation {
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input[type=checkbox] {
        transform: scale(1.6);
        margin-right: 5px;
      }

      label[for=isTextarea] {
        font-size: 1.2rem;
      }
    }
  }

  input[type=text],
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

  .date {
    .date__select {
      .material-symbols-outlined {
        position: absolute;
        top: 1px;
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
  .example__card {
    .example {
      .images {
        img {
          width: 16.5rem;
        }
      }
    }
  }

  .date {
    .date__select {
      width: 50%;
    }
  }
}

@media (min-width: 992px) {

  .example__card {
    .example {
      .images {
        img {
          width: 22rem;
        }
      }
    }
  }
}

@media (min-width: 1200px) {
  .example__card {
    .example {
      .images {
        justify-content: center;
        column-gap: 3rem;

        img {
          width: 24rem;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .example__card {
    .example {
      .images {
        column-gap: 4rem;

        img {
          width: 25rem;
        }
      }
    }
  }
}
</style>
