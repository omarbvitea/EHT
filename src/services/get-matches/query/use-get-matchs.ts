import { useQuery } from '@tanstack/vue-query'

import { getMatchesIds } from '@/services/get-matches/get-matches'

export const useGetMatchesIds = (puuid: string, start?: number, count?: number) => {
	return useQuery({
		queryKey: ['matches', puuid, start, count],
		queryFn: async () => await getMatchesIds(puuid, start ?? 0, count ?? 30),
		enabled: computed(() => !!puuid)
	})
}
