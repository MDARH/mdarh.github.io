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
  project: { type: Object, required: true },
  compact: { type: Boolean, default: false }
})

defineEmits(['details'])

const handleImageError = (event) => {
  event.target.src = './images/default-project-thumbnail.svg'
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    :class="{ 'bg-gray-50 dark:bg-gray-700': compact }"
  >
    <div class="relative aspect-video overflow-hidden">
      <img
        :src="projectImageSrc(project.image)"
        :alt="project.name"
        class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        @error="handleImageError"
      />
      <div class="absolute top-2 left-2 flex flex-wrap gap-1">
        <span
          class="px-2 py-0.5 text-xs font-medium rounded-full"
          :class="statusBadgeClass(project.status)"
        >
          {{ statusBadgeLabel(project.status) }}
        </span>
        <span
          v-if="showPrivateBadge(project)"
          class="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-200 text-slate-800 dark:bg-slate-600 dark:text-slate-100"
        >
          Private
        </span>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ project.name }}</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4" :class="compact ? 'line-clamp-3' : ''">
        {{ project.description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.tech"
          :key="tech"
          class="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
        >
          {{ tech }}
        </span>
      </div>
      <div class="flex gap-3 flex-wrap">
        <a
          v-if="hasLiveUrl(project)"
          :href="project.live_url"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary flex-1 text-center min-w-[7rem]"
        >
          View Live
        </a>
        <span
          v-else-if="showPrivateBadge(project)"
          class="flex-1 text-center px-4 py-2 rounded-lg text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 min-w-[7rem]"
        >
          Private
        </span>
        <a
          v-if="repoUrlForDisplay(project)"
          :href="repoUrlForDisplay(project)"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary flex-1 text-center min-w-[7rem]"
        >
          View Code
        </a>
        <button type="button" class="btn btn-secondary flex-1 min-w-[7rem]" @click="$emit('details', project)">
          Details
        </button>
      </div>
    </div>
  </div>
</template>
