<script setup>
import { computed } from 'vue'
import profile from '@profile'

const linkEntries = computed(() => {
  const labels = {
    github: 'GitHub',
    linkedin: 'LinkedIn',
    website: 'Website',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    facebook: 'Facebook',
    youtube: 'YouTube'
  }
  return Object.entries(profile.links || {})
    .filter(([, url]) => Boolean(url))
    .map(([key, url]) => ({
      key,
      label: labels[key] || key,
      url,
      username: url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    }))
})

const getSocialIconColor = (key) => {
  const colors = {
    whatsapp: 'text-green-500 dark:text-green-400',
    telegram: 'text-blue-500 dark:text-blue-400',
    linkedin: 'text-blue-600 dark:text-blue-500',
    facebook: 'text-blue-600 dark:text-blue-500',
    github: 'text-gray-800 dark:text-gray-200',
    youtube: 'text-red-600 dark:text-red-500',
    website: 'text-indigo-600 dark:text-indigo-400'
  }
  return colors[key] || 'text-gray-600 dark:text-gray-400'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center font-primary">Let's Connect</h2>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <p class="text-gray-600 dark:text-gray-300 text-center text-lg mb-8 text-body">
          Feel free to reach out through email or any of the links below.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            v-if="profile.email"
            :href="`mailto:${profile.email}`"
            class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <span class="text-gray-600 dark:text-gray-300 font-medium">Email</span>
            <span class="text-gray-800 dark:text-white text-body truncate">{{ profile.email }}</span>
          </a>

          <a
            v-for="item in linkEntries"
            :key="item.key"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
          >
            <span :class="getSocialIconColor(item.key)" class="font-medium">{{ item.label }}</span>
            <span class="text-gray-800 dark:text-white text-body truncate group-hover:text-opacity-90">
              {{ item.username }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-body {
  font-family: 'Space Mono', monospace;
}

.font-primary {
  font-family: 'Merienda', cursive;
}
</style>
