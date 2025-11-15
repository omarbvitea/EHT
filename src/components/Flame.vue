<template>
	<div class="relative flex items-center justify-center">
		<div
			class="animate-pulse-flame pointer-events-none absolute rounded-full"
			:style="{
				width: `${size * 1.8}px`,
				height: `${size * 1.8}px`,
				backgroundColor: flickerColor,
				filter: `blur(${size * 0.4}px)`
			}"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1128.55 1585.84"
			:style="{ width: `${size}px`, height: 'auto' }"
			class="relative"
		>
			<path :d="path1" :fill="colors[0]" />
			<path :d="path2" :fill="colors[1]" />
			<path :d="path3" :fill="colors[2]" />
		</svg>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		power?: number
		size?: number
	}>(),
	{
		power: 4,
		size: 24
	}
)

const path1 =
	'M1128.55,1143.33c.69,299.49-299.64,457.88-584.9,441.34C191.12,1564.21,25.94,1341.95,2.3,1083.49c-19.3-210.95,86.12-413.9,196.44-528.78-3.85,45.95,.2,94.76,25.39,133.38,25.18,38.63,76.1,63.12,119.09,46.45,54.51-21.15,69.47-93.76,55.26-150.48-14.21-56.73-48.38-106.95-62.11-163.79-22.29-92.37,13.62-191.9,75.8-263.76C474.34,84.65,559.83,36.91,647.4,0c-52.66,61.74-59.64,158.19-16.41,226.86,41.29,65.6,116.94,99.66,175.5,150.45,98.49,85.44,145.95,235,90.19,352.85-15.05,31.8-36.6,60.19-51.66,91.98-15.06,31.79-23.2,69.49-9.74,101.99s54.67,54.47,85.67,37.83c35.85-19.23,36.39-76.68,15.83-132.21,121.91,45.71,191.47,182.2,191.77,313.57Z'
const path2 =
	'M921.66,1364.92c-43.66,86.53-122.19,153.3-211.92,189.97-9.48,3.87-19.07,7.42-28.76,10.65-97.65,32.57-204.79,23.74-294.42-26.88-67.02-37.85-128.63-100.53-167.8-206.83-40.67-110.41-17.48-265.77,44.84-359.92,.45,46.93,50.83,83.07,97.52,78.4,46.7-4.66,85.61-41.24,104.94-84,19.33-42.76,22.21-91.01,21.83-137.94-.37-46.93-3.65-94.27,4.47-140.49,8.11-46.22,36.32-119.1,83.26-160.53-43.69,85.31-8.04,169.2,36.34,239.92,44.39,70.72,101.52,95.37,131.63,216.31,21.13,84.86-21.53,166.16,63.78,188.91,65.79,17.54,117-59.31,113.75-104.05,39.97,88.3,44.2,209.96,.54,296.5Z'
const path3 =
	'M729.28,1503.32c-38.95,53.74-90.93,83.67-179.28,80.12-91.2-3.66-145.64-55.12-183.56-126.62-33.61-63.38-38.27-143.16-22.41-211.12,29.51,56.03,69.53,78.81,124.15,86.19-52.44-92.69-8.56-258.44,111.8-346.2-24.02,37.43-19.07,84.99,.74,124.29,19.82,39.28,52.73,72.12,84.86,104.51,32.13,32.38,64.52,65.77,82.91,105.58,27.27,59.04,19.75,129.51-19.21,183.25Z'

const colors = computed(() => {
	if (props.power >= 4) return ['#555555', '#777777', '#999999']
	if (props.power >= 3) return ['#d33d3d', '#ff884d', '#ffcf57']
	if (props.power >= 2) return ['#d33d3d', '#ff884d', '#ffcf57']
	return ['#1f4fcc', '#4db8ff', '#e6faff']
})

const flickerColor = computed(() => {
	if (props.power >= 4) return '#77777780'
	if (props.power >= 3) return '#ff884d50'
	if (props.power >= 2) return '#ff884d80'
	return '#82CAFA'
})

const size = computed(() => {
	if (props.power >= 3) return props.size * 0.75
	if (props.power == 1) return props.size * 1.2
	return props.size
})
</script>

<style scoped>
@keyframes pulse-flame {
	0%,
	100% {
		transform: scale(1);
		opacity: 0.8;
	}
	50% {
		transform: scale(1.2);
		opacity: 1;
	}
}

.animate-pulse-flame {
	animation: pulse-flame 1.2s infinite ease-in-out;
}
</style>
