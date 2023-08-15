<script setup>
import { useQuotationDataStore } from '../store/quotationData'
import { storeToRefs } from 'pinia'

// Sidebar open on mobile screen
const quotationStore = useQuotationDataStore()
const { isSidebarOpen } = storeToRefs(quotationStore)
</script>

<template></template>