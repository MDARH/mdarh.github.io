<script setup>
defineProps({
  certification: { type: Object, required: true }
})

defineEmits(['view'])
</script>

<template>
  <article
    class="card flex flex-col md:flex-row gap-6 overflow-hidden border border-gray-100 dark:border-gray-700"
  >
    <button
      type="button"
      class="md:w-52 shrink-0 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-blue-500 focus:ring-blue-500 transition-shadow text-left"
      @click="$emit('view', certification)"
    >
      <img
        :src="certification.image_url.replace(/\\.webp$/i, '-thumb.webp')"
        :alt="`${certification.name} thumbnail`"
        class="w-full h-full object-cover min-h-[140px] bg-white"
        loading="lazy"
        @error="(e) => (e.target.src = certification.image_url)"
      />
    </button>

    <div class="flex-1 min-w-0">
      <p class="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">
        Certificate of Achievement
      </p>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ certification.name }}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-3">{{ certification.issuer }}</p>
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {{ certification.description }}
      </p>

      <div class="flex flex-wrap gap-2 mb-4 text-sm">
        <span class="px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
          {{ certification.batch }}
        </span>
        <span class="px-2 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100">
          ID: {{ certification.credential_id }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="skill in certification.skills"
          :key="skill"
          class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          {{ skill }}
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <button type="button" class="btn btn-primary" @click="$emit('view', certification)">
          View certificate
        </button>
        <a
          :href="certification.file_url"
          download
          class="btn btn-secondary inline-flex items-center justify-center"
        >
          Download PDF
        </a>
      </div>
    </div>
  </article>
</template>
