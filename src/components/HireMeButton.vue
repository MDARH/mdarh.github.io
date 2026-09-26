<template>
  <router-link 
    to="/contact" 
    class="hire-me-btn"
    :class="{ 'dark:bg-purple-600 dark:hover:bg-purple-700': isDark }"
  >
    <span class="relative z-10">Hire Me</span>
  </router-link>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<style scoped>
.hire-me-btn {
  @apply inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 relative overflow-hidden;
}
</style>
