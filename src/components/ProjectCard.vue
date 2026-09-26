<template>
	<div class="max-w-xs rounded overflow-hidden shadow-lg">
		<img class="w-full" src="/path/to/project/image.png" alt="Project image">
		<div class="px-6 py-4">
			<div class="font-bold text-xl mb-2">{{ projectTitle }}</div>
			<p class="text-gray-700 text-base">{{ projectDescription }}</p>
		</div>
		<div class="px-6 py-4 flex justify-center space-x-2">
			<a href="{{ projectLink }}"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">View Project</a>
			<a href="{{ sourc`eCodeLink }}"
				class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">Source Code</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProjectCard',
	props: {
		projectTitle: String,
		projectDescription: String,
		projectLink: String,
		sourceCodeLink: String
	},
	// Component data, methods
}
</script>

<style scoped>
/* Component-specific styles */
</style>
