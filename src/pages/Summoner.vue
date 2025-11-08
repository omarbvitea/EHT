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
const averagePlacement = ref<number>(0)

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

  let totalPlacements = 0
  let validMatches = 0

  matches.value.forEach((match) => {
    const member = match.members.find((m) => m.puuid === puuid.value)
    if (!member) return

    const placement = member.placement
    if (placement >= 1 && placement <= 8) {
      const key = placement
      placementCounts[key] = (placementCounts[key] ?? 0) + 1
      totalPlacements += placement
      validMatches++
    }
  })

  averagePlacement.value = validMatches > 0 ? totalPlacements / validMatches : 0

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
