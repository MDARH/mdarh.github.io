<script setup>
import { ref } from 'vue';
import portfolioData from '@profile';

const selectedProject = ref(null);

// Use projects from root profile.json (build-time import)
const projects = ref(portfolioData.projects || []);

const openModal = (project) => {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedProject.value = null;
  document.body.style.overflow = 'auto';
};

/**
 * Handles image loading errors by setting a default thumbnail
 * @param {Event} event - The error event
 */
const handleImageError = (event) => {
  event.target.src = './images/default-project-thumbnail.svg';
};
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Projects</h2>
    
    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projects" :key="project.id" 
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="relative aspect-video overflow-hidden">
          <img :src="project.image" :alt="project.title" 
            class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" @error="handleImageError">
        </div>
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ project.title }}</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tech in project.technologies" :key="tech"
              class="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
              {{ tech }}
            </span>
          </div>
          <div class="flex gap-4">
            <a v-if="project.active" :href="project.link" target="_blank" rel="noopener noreferrer" 
              class="btn btn-primary flex-1 text-center">View Live</a>
            <button @click="openModal(project)"
              class="btn btn-secondary flex-1">Details</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div v-if="selectedProject" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="closeModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedProject.title }}</h3>
            <button @click="closeModal" 
              class="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
              <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img :src="selectedProject.image" :alt="selectedProject.title" 
            class="w-full aspect-video object-cover rounded-lg mb-6" @error="handleImageError">

          <p class="text-gray-700 dark:text-gray-300 mb-6">{{ selectedProject.description }}</p>

          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Features</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>

          <div class="mb-6">
            <h4 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Technologies Used</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in selectedProject.technologies" :key="tech"
                class="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                {{ tech }}
              </span>
            </div>
          </div>

          <div class="flex gap-4">
            <a v-if="selectedProject.active" :href="selectedProject.link" target="_blank" rel="noopener noreferrer" 
              class="btn btn-primary flex-1 text-center">
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
