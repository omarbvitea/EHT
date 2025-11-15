<script setup lang="ts">
import LoadingOverlay from '@/components/LoadingOverlay.vue'
</script>

<template>
	<div class="grid h-screen w-screen grid-cols-1 grid-rows-[auto_1fr] gap-8">
		<router-view />
		<Toast />
		<LoadingOverlay />
	</div>
</template>
