<script setup>
import { ref, computed } from 'vue'
import profileData from '@profile'
import { projectsForSite } from '@/lib/projects'
import ProjectCardSite from '@/components/ProjectCardSite.vue'
import ProjectDetailModal from '@/components/ProjectDetailModal.vue'

const selectedProject = ref(null)
const projects = computed(() => projectsForSite(profileData.projects))

const openModal = (project) => {
  selectedProject.value = project
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  document.body.style.overflow = 'auto'
}
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCardSite
        v-for="project in projects"
        :key="project.name"
        :project="project"
        @details="openModal"
      />
    </div>

    <ProjectDetailModal :project="selectedProject" @close="closeModal" />
  </div>
</template>
