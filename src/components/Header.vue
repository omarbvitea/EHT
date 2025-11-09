<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
	<header class="top-0 z-40 flex h-20 w-full bg-black/50 shadow-sm backdrop-blur-sm">
		<div class="container mx-auto flex items-center px-4">
			<img
				src="/EHT/EHT.svg"
				alt="EHT Logo"
				class="h-8 w-auto"
				@click="router.push({ name: 'home' })"
			/>
		</div>
	</header>
</template>
