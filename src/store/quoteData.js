import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuoteDataStore = defineStore('quoteData', () => {
  // Quote
  const quote = ref('')
  const setQuote = (event) => {
    quote.value = event.target.value
  }

  // Date
  const date = ref()
  const setDate = (value) => {
    date.value = value
  }

  return { quote, setQuote, date, setDate }
})
