<script setup>

const props = defineProps({
  page: {
    type: String,
    default: ''
  }
})

const steppers = [
  {
    title: '輸入名言/日期',
    key: 'quotationInput'
  },
  {
    title: '選擇立繪',
    key: 'imagesSelection'
  },
  {
    title: '輸入來源',
    key: 'sourceInput'
  },
  {
    title: '完成製圖',
    key: 'finalPage'
  }
]

</script>

<template>
  <div class="stepper__group">
    <div
      v-for="(stepperItem, index) in steppers"
      :key="stepperItem.title"
      class="stepper__item"
      :class="{ stepper__item__last: index === steppers.length - 1 }"
    >
      <div class="stepper">
        <div
          class="stepper__order"
          :class="{ stepper__active: page === stepperItem.key }"
        >
          {{ index + 1 }}
        </div>
        <div
          class="stepper__title"
          :class="{ stepper__active: page === stepperItem.key }"
        >
          {{ stepperItem.title }}
        </div>
      </div>
      <div
        v-if="index !== steppers.length - 1"
        class="stepper__line"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stepper__group {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .stepper__item {
    display: flex;
    flex-grow: 1;

    .stepper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.8rem;
      width: 3rem;

      .stepper__order {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 25px;
        height: 25px;
        background-color: var(--primary-grey);
        color: #fff;
        border-radius: 3rem;
      }

      .stepper__order.stepper__active {
        background-color: var(--primary-red);
      }
    }

    .stepper__title {
      white-space: nowrap;
      font-weight: 600;
      color: var(--primary-grey);
    }

    .stepper__title.stepper__active {
      color: var(--primary-red)
    }
  }

  .stepper__item__last {
    flex-grow: 0;
  }

  .stepper__line {
    width: 100%;
    height: 1px;
    border: 1px solid var(--secondary-grey);
    margin-top: 12.5px
  }
}


@media (min-width: 768px) {
  .stepper__group {
    padding: 0 3rem;

    .stepper__item {
      .stepper {
        font-size: 1.1rem;

        .stepper__order {
          width: 32px;
          height: 32px;
        }
      }

      .stepper__line {
        margin-top: 16px
      }
    }
  }
}
</style>
