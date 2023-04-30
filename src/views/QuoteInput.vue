<script setup>
import BaseCard from '../components/BaseCard.vue'
import BaseButton from '../components/BaseButton.vue'

</script>

<template>
  <main>
    <BaseCard>
      <div class="quote_input">
        <h2 for="">
          請輸入灰妲曾說過的名言：
        </h2>
        <input type="text">
      </div>
      <div class="quote_date">
        <h2>
          請選擇該名言誕生的日期：
        </h2>
        <input type="date">
      </div>
    </BaseCard>
    <BaseButton>
      下一步
    </BaseButton>
  </main>
</template>

<style lang="scss">
input[type=text],
input[type=date] {
  width: 100%;
  font-size: 1.5rem;
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid white;

  &:focus {
    outline: 0;
    border-bottom: 3px solid white;

  }
}
</style>
