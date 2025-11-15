import { useQuery } from '@tanstack/vue-query'

import { getMatch } from '@/services/get-matches/get-match'

export const useGetMatch = (matchId: string) => {
	return useQuery({
		queryKey: ['match', matchId],
		queryFn: async () => await getMatch(matchId),
		enabled: computed(() => !!matchId)
	})
}
