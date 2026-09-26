<script setup>
import { ref, onMounted, computed } from 'vue';
import portfolioData from '@/data/portfolio.json';

const isDarkMode = ref(localStorage.getItem('darkMode') === 'true' || false);
const profile = portfolioData.profile;
const contact = portfolioData.contact;
const projects = portfolioData.projects;

const welcomeText = ref('');
const nameText = ref('');
const titleText = ref('');
const descriptionPrefix = ref('');
const descriptionText = ref('');
const showButton = ref(false);
const showWelcomeTyping = ref(true);
const showNameTyping = ref(true);
const showTitleTyping = ref(true);
const currentDescriptionIndex = ref(0);
const showModal = ref(false);
const selectedProject = ref(null);

const typeWriter = async (text, delay, targetRef) => {
    targetRef.value = '';
    for (let i = 0; i < text.length; i++) {
        targetRef.value += text[i];
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};

const eraseText = async (targetRef, delay) => {
    while (targetRef.value.length > 0) {
        targetRef.value = targetRef.value.slice(0, -1);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
};

const cycleDescriptions = async () => {
    await typeWriter("I specialize in ", 50, descriptionPrefix);
    
    while (true) {
        await typeWriter(profile.descriptions[currentDescriptionIndex.value], 50, descriptionText);
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
        await eraseText(descriptionText, 30);
        currentDescriptionIndex.value = (currentDescriptionIndex.value + 1) % profile.descriptions.length;
        await new Promise(resolve => setTimeout(resolve, 500)); // Pause before next description
    }
};

const featuredProjects = computed(() => {
  return projects ? projects.filter(project => project.featured) : [];
});

/**
 * Opens the project details modal
 * @param {Object} project - The project object to display
 */
const openModal = (project) => {
  selectedProject.value = project;
  showModal.value = true;
};

/**
 * Closes the project details modal
 */
const closeModal = () => {
  showModal.value = false;
  selectedProject.value = null;
};

/**
 * Handles image loading errors by setting a default thumbnail
 * @param {Event} event - The error event
 */
const handleImageError = (event) => {
  event.target.src = './images/default-project-thumbnail.svg';
};

onMounted(async () => {
    if (localStorage.getItem('darkMode') === 'true') {
        isDarkMode.value = true;
        document.body.classList.add('dark');
    }

    // Sequential animations
    await typeWriter('Assalamu Alaikum', 100, welcomeText);
    showWelcomeTyping.value = false;
    await new Promise(resolve => setTimeout(resolve, 500));
    
    await typeWriter(profile.name, 80, nameText);
    showNameTyping.value = false;
    await new Promise(resolve => setTimeout(resolve, 300));

    await typeWriter(profile.title, 40, titleText);
    showTitleTyping.value = false;
    await new Promise(resolve => setTimeout(resolve, 300));
    
    cycleDescriptions(); // Start the description cycle
    showButton.value = true; // Show the button after texts are typed

    // Initialize particles
    if (typeof window !== 'undefined') {
        try {
            // Load particles.js via script tag to avoid strict mode issues
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.onload = () => {
                if (window.particlesJS) {
                    window.particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: isDarkMode.value ? '#ffffff' : '#374151'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: {
                enable: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: isDarkMode.value ? '#ffffff' : '#374151',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 3,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'bounce',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              }
            }
          },
          retina_detect: true
                    });
                } else {
                    console.warn('particlesJS not available on window object');
                }
            };
            script.onerror = () => {
                console.error('Failed to load particles.js from CDN');
            };
            document.head.appendChild(script);
        } catch (error) {
            console.error('Failed to initialize particles:', error);
        }
    }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <!-- Hero Section -->
      <section class="relative h-screen flex items-center justify-center overflow-hidden">
          <div id="particles-js" class="absolute inset-0"></div>
          <div class="relative z-10 text-center px-4">
              <div class="mb-4">
                  <span class="inline-block text-blue-600 dark:text-blue-400 text-4xl md:text-6xl font-bold font-primary"
                        :class="{ 'typewriter': showWelcomeTyping }">
                      {{ welcomeText }}
                  </span>
              </div>
              <div class="mb-4">
                  <span class="inline-block text-5xl md:text-7xl font-bold text-display leading-tight"
                        :class="{ 'typewriter': showNameTyping }">
                      {{ nameText }}
                  </span>
              </div>
              <div class="mb-6">
                  <span class="inline-block text-2xl md:text-3xl text-blue-600 dark:text-blue-400 text-body tracking-wide"
                        :class="{ 'typewriter': showTitleTyping }">
                      {{ titleText }}
                  </span>
              </div>
              <div class="mb-8">
                  <p class="text-xl max-w-2xl mx-auto text-body tracking-wide">
                      <span class="text-body">{{ descriptionPrefix }}</span>
                      <span class="typewriter">{{ descriptionText }}</span>
                  </p>
              </div>
              <div v-if="showButton" class="slide-up-fade-in">
                  <a href="#featured_projects" 
                     class="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-105 font-primary text-lg">
                      View My Work
                  </a>
                  <a href="#contact" 
                     class="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 mx-4 transition-all hover:scale-105 font-primary text-lg">
                      Hire Me
                  </a>
              </div>
          </div>
      </section>

      <!-- Featured Projects Section -->
      <section id="featured_projects" class="py-20 px-4 bg-white dark:bg-gray-800">
          <div class="max-w-6xl mx-auto">
              <h2 class="text-3xl font-bold text-center mb-12">Featured Projects</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div v-for="project in featuredProjects" :key="project.title" 
                       class="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                      <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" @error="handleImageError">
                      <div class="p-6">
                          <h3 class="text-xl font-bold mb-2">{{ project.title }}</h3>
                          <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
                          <div class="flex flex-wrap gap-2 mb-4">
                              <span v-for="tech in project.technologies" :key="tech"
                                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                  {{ tech }}
                              </span>
                          </div>
                          <div class="flex gap-3">
                              <a v-if="project.active"
                                 :href="project.link"
                                 target="_blank"
                                 class="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                  View Live
                              </a>
                              <button @click="openModal(project)"
                                      class="flex-1 text-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                                  View Details
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="text-center mt-12">
                  <router-link to="/projects" 
                      class="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      View All Projects
                  </router-link>
              </div>
          </div>
      </section>

      <!-- Skills & Experience Section -->
      <section id="skills" class="py-20 px-4 bg-gray-50 dark:bg-gray-900">
          <div class="max-w-6xl mx-auto">
              <h2 class="text-3xl font-bold text-center mb-12 font-primary">Skills & Expertise</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="skill in profile.skills" :key="skill.name" 
                       class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div class="flex justify-between mb-2">
                          <span class="font-primary text-lg">{{ skill.name }}</span>
                          <span class="text-body">{{ skill.level }}%</span>
                      </div>
                      <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" 
                               :style="{ width: skill.level + '%' }"></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="py-20 px-4 bg-white dark:bg-gray-800">
          <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-3xl font-bold mb-8">Get In Touch</h2>
              <p class="text-xl mb-12">Interested in working together? Let's connect!</p>
              <div class="flex justify-center space-x-6">
                  <a :href="`mailto:${contact.email}`" 
                     class="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                      Email Me
                  </a>
                  <a :href="contact.social.find(s => s.platform === 'LinkedIn').link" target="_blank" 
                     class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      LinkedIn
                  </a>
              </div>
          </div>
      </section>

      <!-- Footer -->
      <footer class="py-8 px-4 bg-gray-900 dark:bg-gray-950 text-white">
          <div class="max-w-6xl mx-auto text-center">
              <p>&copy; {{ new Date().getFullYear() }} Abdur Razzaque. All rights reserved.</p>
          </div>
      </footer>

      <!-- Project Details Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="closeModal">
        <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="p-6">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">{{ selectedProject?.title }}</h2>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <!-- Project Image -->
            <div class="mb-6">
              <img :src="selectedProject?.image" :alt="selectedProject?.title" class="w-full h-64 object-cover rounded-lg" @error="handleImageError">
            </div>
            
            <!-- Project Description -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Description</h3>
              <p class="text-gray-600 dark:text-gray-400">{{ selectedProject?.description }}</p>
            </div>
            
            <!-- Technologies -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Technologies Used</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in selectedProject?.technologies" :key="tech"
                      class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {{ tech }}
                </span>
              </div>
            </div>
            
            <!-- Features -->
            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">Key Features</h3>
              <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li v-for="feature in selectedProject?.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex gap-4">
              <a v-if="selectedProject?.active"
                 :href="selectedProject?.link"
                 target="_blank"
                 class="flex-1 text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Visit Website
              </a>
              <a :href="selectedProject?.github"
                 target="_blank"
                 class="flex-1 text-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                View Code
              </a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.typewriter {
    border-right: 0.1em solid currentColor;
    animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: currentColor }
}

.slide-up-fade-in {
    animation: slideUpFadeIn 0.8s ease forwards;
}

@keyframes slideUpFadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dark {
    color-scheme: dark;
}

#particles-js {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

.welcome-title {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards;
}

.welcome-subtitle {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease forwards 0.3s;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.font-primary {
  font-family: 'Merienda', sans-serif;
}

.text-body {
  font-family: 'Space Mono', monospace;
}
</style>
