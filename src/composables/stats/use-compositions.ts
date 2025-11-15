import type { Match } from '@/shared/types'

export const useCompositions = (matches: Ref<Match[]>, puuid: Ref<string>) => {
	const compositions = computed(() => {
		const counts: Record<string, number> = {}

		matches.value.forEach((match) => {
			const member = match.members.find((m) => m.puuid === puuid.value)
			if (!member || member.traits.length === 0) return

			const topTrait = member.traits.reduce((best, current) => {
				if (!best) return current
				return current.quantity > best.quantity ? current : best
			}, member.traits[0])

			if (!topTrait) return

			const parts = topTrait.name.split('_')
			const displayName = parts.length > 1 ? (parts[1] ?? topTrait.name) : topTrait.name

			counts[displayName] = (counts[displayName] ?? 0) + 1
		})

		return counts
	})

	return {
		compositions
	}
}
