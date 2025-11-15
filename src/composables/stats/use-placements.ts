import type { Match } from '@/shared/types'

export const usePlacements = (matches: Ref<Match[]>, puuid: Ref<string>) => {
	const placementCounts = computed(() => {
		const counts: Record<number, number> = {
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
				counts[placement] = (counts[placement] ?? 0) + 1
			}
		})

		return counts
	})

	const averagePlacement = computed(() => {
		if (matches.value.length === 0) return 0

		let totalPlacements = 0

		matches.value.forEach((match) => {
			const member = match.members.find((m) => m.puuid === puuid.value)
			if (!member) return

			const placement = member.placement
			if (placement >= 1 && placement <= 8) {
				totalPlacements += placement
			}
		})

		return totalPlacements / matches.value.length
	})

	return {
		averagePlacement,
		placementCounts
	}
}
