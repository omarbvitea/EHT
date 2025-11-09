<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import Chart from 'primevue/chart'
import { useRouter } from 'vue-router'

import { usePlacements } from '@/composables/stats/use-placements'
import { useFetchMatches } from '@/composables/use-fetch-matches'
import { useOverlay } from '@/composables/use-overlay'
import { useGetMatchesIds } from '@/services/get-matches/get-matches'
import type { Match } from '@/shared/types'

const queryClient = useQueryClient()

const { currentRoute } = useRouter()
const { start, end } = useOverlay()

const puuid = ref('')
const matches = ref<Match[]>([])
const chartData = ref()
const chartOptions = ref()

puuid.value = currentRoute.value.params.puuid as string

const { data: matchesIds } = useGetMatchesIds(puuid.value)

const { averagePlacement, placementCounts } = usePlacements(matches, puuid)

watch(
	matchesIds,
	async (ids) => {
		start()

		if (!ids || ids.length === 0) {
			end()
			return
		}

		try {
			matches.value = await useFetchMatches(ids, queryClient)
		} finally {
			end()
		}
	},
	{ immediate: true }
)

watch(
	placementCounts,
	(counts) => {
		chartData.value = {
			labels: ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5', 'Top 6', 'Top 7', 'Top 8'],
			datasets: [
				{
					data: Object.values(counts),
					backgroundColor: [
						'#da032d',
						'#c2022a',
						'#a10224',
						'#850322',
						'#6f0621',
						'#5a0519',
						'#3e010d',
						'#2a0109'
					],
					borderColor: Array(8).fill('#ffffff'),
					borderWidth: 1,
					minBarLength: 8
				}
			]
		}

		chartOptions.value = {
			indexAxis: 'x',
			maintainAspectRatio: true,
			plugins: {
				legend: {
					display: false
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						stepSize: 1
					},
					title: {
						display: true
					}
				}
			}
		}
	},
	{ deep: true }
)
</script>
<template>
	<div class="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4">
		<div class="flex w-3/4 flex-col gap-4">
			<div class="mb-4 flex w-full items-center justify-between">
				<h1 class="text-start text-2xl">Ultimas 20 partidas</h1>
				<p class="text-lg">
					Promedio: <span class="font-semibold">{{ averagePlacement.toFixed(2) }}</span>
				</p>
			</div>
			<div class="w-full">
				<Chart type="bar" :data="chartData" :options="chartOptions" />
			</div>
		</div>
	</div>
</template>
