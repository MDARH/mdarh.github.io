<script setup>
import { ref, computed } from 'vue'
import profileData from '@profile'
import { certificationsForSite } from '@/lib/certifications'
import CertificationCard from '@/components/CertificationCard.vue'
import CertificateLightbox from '@/components/CertificateLightbox.vue'

defineProps({
  compact: { type: Boolean, default: false }
})

const certifications = computed(() => certificationsForSite(profileData.certifications))

const lightboxOpen = ref(false)
const activeCert = ref(null)

const openLightbox = (cert) => {
  activeCert.value = cert
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  activeCert.value = null
  document.body.style.overflow = ''
}
</script>

<template>
  <section
    v-if="certifications.length"
    id="certifications"
    class="py-20 px-4"
    :class="compact ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'"
  >
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white font-primary">
        Certifications
      </h2>
      <p
        v-if="!compact"
        class="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
      >
        Verified credentials — view or download the original certificate.
      </p>
      <div class="space-y-8 max-w-4xl mx-auto">
        <CertificationCard
          v-for="cert in certifications"
          :key="cert.credential_id"
          :certification="cert"
          @view="openLightbox"
        />
      </div>
    </div>

    <CertificateLightbox
      v-if="activeCert"
      :open="lightboxOpen"
      :image-url="activeCert.image_url"
      :title="activeCert.name"
      :pdf-url="activeCert.file_url"
      @close="closeLightbox"
    />
  </section>
</template>
