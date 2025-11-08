<script setup lang="ts">
import Chart from 'primevue/chart'
import { useRouter } from 'vue-router'

import { useOverlay } from '@/composables/use-overlay'
import { getMatches } from '@/services/get-matches/get-matches'
import type { Match } from '@/shared/types'

const { start, end } = useOverlay()

const router = useRouter()
const puuid = ref('')
const matches = ref<Match[]>([])
const chartData = ref()
const chartOptions = ref()

onBeforeMount(async () => {
  start()
  puuid.value = router.currentRoute.value.params.puuid as string

  matches.value = await getMatches(puuid.value)

  const placementCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  }

  matches.value.forEach((match) => {
    const member = match.members.find((m) => m.puuid === puuid.value)
    if (!member) return

    const placement = member.placement
    if (placement >= 1 && placement <= 8) {
      const key = placement
      placementCounts[key] = (placementCounts[key] ?? 0) + 1
    }
  })

  chartData.value = {
    labels: ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5', 'Top 6', 'Top 7', 'Top 8'],
    datasets: [
      {
        data: [
          placementCounts[1],
          placementCounts[2],
          placementCounts[3],
          placementCounts[4],
          placementCounts[5],
          placementCounts[6],
          placementCounts[7],
          placementCounts[8]
        ],
        backgroundColor: [
          '#34D399',
          '#12B886',
          '#009C73',
          '#00805C',
          '#006647',
          '#004D34',
          '#003422',
          '#001D13'
        ],
        borderColor: Array(8).fill('#FFFFFF'),
        borderWidth: 2,
        minBarLength: 5
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

  end()
})
</script>
<template>
  <div class="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-4">
    <div class="flex w-3/4 flex-col gap-4">
      <h1 class="mb-4 w-full text-start text-2xl">Ultimas 20 partidas</h1>
      <div class="w-full">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>
