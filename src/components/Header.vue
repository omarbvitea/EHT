<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const props = withDefaults(
	defineProps<{
		name?: string
	}>(),
	{
		name: ''
	}
)
</script>
<template>
	<header class="top-0 z-40 flex w-full bg-black/50 shadow-sm backdrop-blur-sm">
		<div class="container mx-auto flex items-center justify-between px-4 py-4">
			<img
				src="/EHT/EHT.svg"
				alt="EHT Logo"
				class="h-6 w-auto cursor-pointer md:h-8"
				@click="router.push({ name: 'home' })"
			/>
			<h1>{{ props.name }}</h1>
		</div>
	</header>
</template>
