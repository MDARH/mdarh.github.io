<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const isDarkMode = ref(localStorage.getItem('darkMode') === 'true' || false);

const toggleMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('darkMode', isDarkMode.value.toString());
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <router-link to="/" class="text-xl font-bold text-gray-800 dark:text-white">AR</router-link>
        </div>
        
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-4">
            <router-link to="/" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
            <router-link to="/experience" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Experience</router-link>
            <router-link to="/projects" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Projects</router-link>
            <router-link to="/contact" class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium">Contact</router-link>
            <button @click="toggleMode" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <SunIcon v-if="isDarkMode" class="w-5 h-5 text-yellow-500" />
              <MoonIcon v-else class="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <button @click="toggleMode" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors mr-2">
            <SunIcon v-if="isDarkMode" class="w-5 h-5 text-yellow-500" />
            <MoonIcon v-else class="w-5 h-5 text-gray-700" />
          </button>
          <button @click="toggleMenu" class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path :class="{'hidden': isMenuOpen, 'inline-flex': !isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path :class="{'hidden': !isMenuOpen, 'inline-flex': isMenuOpen }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link to="/" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">Home</router-link>
        <router-link to="/experience" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">Experience</router-link>
        <router-link to="/projects" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">Projects</router-link>
        <router-link to="/contact" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium">Contact</router-link>
      </div>
    </div>
  </nav>
</template>
