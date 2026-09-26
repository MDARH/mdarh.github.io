<template>
  <div class="loading-container" :class="{ 'dark:bg-gray-900': isDark }">
    <div class="loading-text" :class="{ 'dark:text-white': isDark }">
      <span>L</span>
      <span>o</span>
      <span>a</span>
      <span>d</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
}

.loading-text {
  font-family: 'Merienda', cursive;
  font-size: 2rem;
  color: #2c3e50;
}

.loading-text span {
  display: inline-block;
  animation: bounce 0.3s ease infinite alternate;
}

.loading-text span:nth-child(2) { animation-delay: 0.1s; }
.loading-text span:nth-child(3) { animation-delay: 0.2s; }
.loading-text span:nth-child(4) { animation-delay: 0.3s; }
.loading-text span:nth-child(5) { animation-delay: 0.4s; }
.loading-text span:nth-child(6) { animation-delay: 0.5s; }
.loading-text span:nth-child(7) { animation-delay: 0.6s; }
.loading-text span:nth-child(8) { animation-delay: 0.7s; }
.loading-text span:nth-child(9) { animation-delay: 0.8s; }
.loading-text span:nth-child(10) { animation-delay: 0.9s; }

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-8px);
  }
}
</style>
