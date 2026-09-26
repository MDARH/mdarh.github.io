<script setup>
import {
  hasLiveUrl,
  repoUrlForDisplay,
  showPrivateBadge,
  statusBadgeClass,
  statusBadgeLabel,
  projectImageSrc
} from '@/lib/projects'

defineProps({
  project: { type: Object, default: null }
})

defineEmits(['close'])

const handleImageError = (event) => {
  event.target.src = './images/default-project-thumbnail.svg'
}
</script>

<template>
  <div
    v-if="project"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4 gap-4">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ project.name }}</h2>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="px-2 py-0.5 text-xs rounded-full" :class="statusBadgeClass(project.status)">
                {{ statusBadgeLabel(project.status) }}
              </span>
              <span
                v-if="showPrivateBadge(project)"
                class="px-2 py-0.5 text-xs rounded-full bg-slate-200 text-slate-800 dark:bg-slate-600"
              >
                Private
              </span>
            </div>
          </div>
          <button
            type="button"
            class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            @click="$emit('close')"
          >
            <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <img
          :src="projectImageSrc(project.image)"
          :alt="project.name"
          class="w-full h-64 object-cover rounded-lg mb-6"
          @error="handleImageError"
        />

        <p class="text-gray-600 dark:text-gray-400 mb-6">{{ project.description }}</p>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Technologies</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <div class="flex gap-4 flex-wrap">
          <a
            v-if="hasLiveUrl(project)"
            :href="project.live_url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary flex-1 text-center min-w-[10rem]"
          >
            Visit Website
          </a>
          <a
            v-if="repoUrlForDisplay(project)"
            :href="repoUrlForDisplay(project)"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary flex-1 text-center min-w-[10rem]"
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
