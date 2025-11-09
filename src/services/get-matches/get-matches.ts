import { useQuery } from '@tanstack/vue-query'

import { america } from '@/shared/http'

export const getMatchesIds = async (puuid: string): Promise<string[]> => {
	return await america.get<string[]>(`tft/match/v1/matches/by-puuid/${puuid}/ids`).json()
}

export const useGetMatchesIds = (puuid: string) => {
	return useQuery({
		queryKey: ['matches', puuid],
		queryFn: async () => await getMatchesIds(puuid),
		enabled: computed(() => !!puuid)
	})
}
