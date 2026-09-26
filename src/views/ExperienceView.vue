<script setup>
import { ref } from 'vue';
import experienceData from '@/data/experience.json';

const experience = experienceData.experience;

const technologies = ref([
  { name: 'Laravel', icon: 'devicon-laravel-plain' },
  { name: 'TailwindCSS', icon: 'devicon-tailwindcss-plain' },
  { name: 'VueJS', icon: 'devicon-vuejs-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'FilamentPHP', icon: 'devicon-php-plain' },
  { name: 'Inertia', icon: 'devicon-javascript-plain' }
]);

const tools = ref([
  { name: 'Windows', icon: 'devicon-windows8-original' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'GitHub', icon: 'devicon-github-original' },
  { name: 'Laragon', icon: 'devicon-apache-plain' },
  { name: 'VS Code', icon: 'devicon-vscode-plain' }
]);

const education = ref([
  {
    year: '2017',
    degree: 'HSC/Alim',
    institution: 'Nur-e Mohammadia (SM) Madarasha, Bashaboo, Dhaka'
  },
  {
    year: '2014',
    degree: 'SSC/Dakhil',
    institution: 'Nabiabad Islamia Dakhil Madrasha, Nandipara, Dhaka'
  }
]);

const courses = ref([
  {
    year: '2017',
    title: 'Web Development Course',
    institution: 'Creative IT Institute',
    duration: '6 Months',
    technologies: 'HTML, CSS, PHP, WordPress, Codeignator, Laravel'
  },
  {
    year: '2023',
    title: 'Web Development Course',
    institution: 'Programming Hero',
    status: 'Ongoing',
    technologies: 'HTML, CSS, JavaScript, Bootstrap, Tailwind, React, Vite, React Router, Firebase, ExpressJS, API, Axios, Rechart, MongoDB, JWT'
  }
]);
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <!-- Experience Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{{ experience.title }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div v-for="(exp, index) in experience.sections" :key="index" class="card">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{{ exp.title }}</h3>
          <ul class="space-y-3">
            <li v-for="(item, i) in exp.items" :key="i" class="flex items-start">
              <svg class="h-6 w-6 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Technologies Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Technologies I Use</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        <div v-for="tech in technologies" :key="tech.name" 
          class="card flex flex-col items-center justify-center p-4 hover:shadow-xl transition-shadow">
          <i :class="tech.icon" class="text-4xl mb-2 text-blue-600 dark:text-blue-400"></i>
          <span class="text-gray-900 dark:text-white text-sm font-medium">{{ tech.name }}</span>
        </div>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Management Tools</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        <div v-for="tool in tools" :key="tool.name"
          class="card flex flex-col items-center justify-center p-4 hover:shadow-xl transition-shadow">
          <i :class="tool.icon" class="text-4xl mb-2 text-blue-600 dark:text-blue-400"></i>
          <span class="text-gray-900 dark:text-white text-sm font-medium">{{ tool.name }}</span>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Education</h2>
      <div class="space-y-6">
        <div v-for="edu in education" :key="edu.year" class="card">
          <div class="flex items-center mb-2">
            <span class="text-blue-600 dark:text-blue-400 font-semibold">{{ edu.year }}</span>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-gray-900 dark:text-white font-semibold">{{ edu.degree }}</span>
          </div>
          <p class="text-gray-700 dark:text-gray-300">{{ edu.institution }}</p>
        </div>
      </div>
    </section>

    <!-- Technical Courses Section -->
    <section>
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Technical Courses</h2>
      <div class="space-y-6">
        <div v-for="course in courses" :key="course.year" class="card">
          <div class="flex items-center mb-2">
            <span class="text-blue-600 dark:text-blue-400 font-semibold">{{ course.year }}</span>
            <span class="mx-2 text-gray-400">•</span>
            <span class="text-gray-900 dark:text-white font-semibold">{{ course.title }}</span>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-2">{{ course.institution }}</p>
          <p class="text-gray-700 dark:text-gray-300 mb-2">
            <span v-if="course.duration">Duration: {{ course.duration }}</span>
            <span v-if="course.status">Status: {{ course.status }}</span>
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">Technologies: {{ course.technologies }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
