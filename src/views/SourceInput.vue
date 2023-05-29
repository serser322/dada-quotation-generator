<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

const isSelected = ref(true)

// Source input
const quotationStore = useQuotationDataStore()
const { source } = storeToRefs(quotationStore)
const updateSource = (event) => {
  quotationStore.setSourceUrl(event.target.value)
}

// Button router
const router = useRouter()
const toImageSelection = () => {
  router.push({ name: 'ImagesSelection' })
}
</script>

<template>
  <main>
    <BaseCard>
      <div class="source__input">
        <div class="title">
          <h2 for="">
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
          :value="source"
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
      <BaseButton @click="toImageSelection">
        製作名言圖
      </BaseButton>
    </div>
  </main>
</template>

<style lang="scss" scoped>
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
