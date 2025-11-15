<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import Chart from 'primevue/chart'
import { useRouter } from 'vue-router'

import { useCompositions } from '@/composables/stats/use-compositions'
import { usePlacements } from '@/composables/stats/use-placements'
import { useFetchMatches } from '@/composables/use-fetch-matches'
import { useOverlay } from '@/composables/use-overlay'
import { useGetMatchesIds } from '@/services/get-matches/query/use-get-matchs'
import { fetchNameByPuuid } from '@/services/get-name/get-name'
import {
	TopsChartOptions,
	getTopChartConfig,
	ComposChartOptions,
	getComposChartConfig
} from '@/shared/charts'
import type { Match } from '@/shared/types'

const queryClient = useQueryClient()

const { currentRoute } = useRouter()
const { start, end } = useOverlay()

const puuid = ref('')
const matches = ref<Match[]>([])
const topsChartData = ref()
const composChartData = ref()

puuid.value = currentRoute.value.params.puuid as string

const { data: matchesIds } = useGetMatchesIds(puuid.value)

const { averagePlacement, placementCounts } = usePlacements(matches, puuid)
const { compositions } = useCompositions(matches, puuid)

const name = ref('')

watch(
	matchesIds,
	async (ids) => {
		if (!ids || ids.length === 0) {
			end()
			return
		}

		try {
			matches.value = await useFetchMatches(ids, queryClient)
			name.value = await fetchNameByPuuid(puuid.value)
		} finally {
			end()
		}
	},
	{ immediate: true }
)

watch(placementCounts, (counts) => {
	topsChartData.value = getTopChartConfig(counts)
})

watch(compositions, (counts) => {
	composChartData.value = getComposChartConfig(counts)
})

onMounted(() => {
	start()
})

onUnmounted(() => {
	end()
})
</script>

<template>
	<Header :name="name" />
	<div class="container mx-auto flex h-full w-full items-center justify-center px-4">
		<div class="flex w-full flex-col gap-4 sm:gap-8">
			<Card class="max-w-140 p-0 md:px-3">
				<template #content>
					<div class="flex items-center justify-between gap-4">
						<div class="flex flex-col gap-2">
							<h1 class="text-xl md:text-2xl">Promedio</h1>
							<div class="flex h-7 gap-2">
								<Chip label="Ultimas 30 partidas" class="text-sm" />
								<Chip label="Set 7.5" class="text-sm" />
							</div>
						</div>
						<h1 class="flex items-center gap-6 text-start text-4xl font-bold">
							<Flame :power="averagePlacement" />{{ averagePlacement.toFixed(2) }}
						</h1>
					</div>
				</template>
			</Card>
			<div class="grid h-full w-full grid-cols-1 gap-4 sm:gap-8 md:grid-cols-12">
				<Card class="col-span-8 p-0 md:py-6">
					<template #content>
						<Chart type="bar" :data="topsChartData" :options="TopsChartOptions" class="w-full" />
					</template>
				</Card>
				<Card class="col-span-4 place-content-center px-3 py-6">
					<template #content>
						<Chart
							type="doughnut"
							:data="composChartData"
							:options="ComposChartOptions"
							class="w-full"
						/>
					</template>
				</Card>
			</div>
		</div>
	</div>
</template>
