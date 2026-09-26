<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-blue-600 dark:text-blue-400 animate-bounce-slow">404</h1>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">Page Not Found</h2>
            <p class="text-gray-600 dark:text-gray-400 text-lg mb-8">The page you're looking for doesn't exist or has been moved.</p>
            <button 
                @click="goHome"
                class="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                Back to Home
            </button>
        </div>
    </div>
</template>

<style scoped>
.animate-bounce-slow {
    animation: bounce 3s infinite;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>
