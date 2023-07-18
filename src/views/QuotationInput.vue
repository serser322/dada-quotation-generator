<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
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
const isTextarea = ref(false)

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
    <BaseCard>
      <div class="quotation">
        <div class="title">
          <h2>
            請輸入灰妲曾說過的名言：
          </h2>
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
            placeholder="請在此輸入名言..."
            @input="updateQuotation"
          >
          <div
            class="invalid__text"
            :class="isInputValid ? 'hidden' : ''"
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
            :class="isTextareaValid ? 'hidden' : ''"
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
            :class="isDateValid ? 'hidden' : ''"
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
.quotation {
  .title {
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
  font-size: 1.2rem;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid white;

  &:focus {
    outline: 0;
    border-bottom: 3px solid white;
  }

  &.invalid {
    border-bottom: 2px solid red;
  }
}

textarea {
  margin-top: 1rem;
  width: 100%;
  font-size: 1.2rem;
  background-color: transparent;
  border: 2px solid white;
  border-radius: 10px;
  resize: none;

  &:focus {
    outline: 0;
    border-bottom: 3px solid white;
  }

  &.invalid {
    border: 2px solid red;
  }
}

.date {
  margin-top: 4rem;

  .date__select {
    width: 100%;

    .date__input {
      padding-left: 2.5rem;
    }

    .material-symbols-outlined {
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
  font-size: 0.8rem;
  color: red;
  visibility: visible;
  margin-top: 3px;

  &.hidden {
    visibility: hidden;
  }
}

.btn-next {
  margin-left: auto
}

@media (min-width: 576px) {
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
        font-weight: bold;
      }
    }
  }

  input[type=text],
  textarea {
    margin-top: 0;
    font-size: 1.5rem;
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

}

@media (min-width: 768px) {
  .date {
    .date__select {
      width: 50%;
    }
  }
}
</style>
