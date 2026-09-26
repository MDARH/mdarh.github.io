<script setup>
defineProps({
  open: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
  title: { type: String, default: 'Certificate' },
  pdfUrl: { type: String, default: '' }
})

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.self="$emit('close')"
    >
      <div class="relative max-w-5xl w-full max-h-[92vh] flex flex-col">
        <div class="flex justify-end gap-2 mb-2">
          <a
            v-if="pdfUrl"
            :href="pdfUrl"
            download
            class="px-4 py-2 text-sm rounded-lg bg-white text-gray-900 hover:bg-gray-100"
          >
            Download PDF
          </a>
          <button
            type="button"
            class="px-4 py-2 text-sm rounded-lg bg-gray-800 text-white hover:bg-gray-700"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
        <img
          :src="imageUrl"
          :alt="title"
          class="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl bg-white"
        />
      </div>
    </div>
  </Teleport>
</template>
