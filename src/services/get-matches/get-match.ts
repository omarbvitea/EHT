import { useQuery } from '@tanstack/vue-query'

import { america } from '@/shared/http'
import type { Match } from '@/shared/types'

import { mapMatchApiToMatch } from './mappers/match'

import type { MatchApiResponse } from './types'

export const getMatch = async (matchId: string): Promise<Match> => {
	const match = await america.get(`tft/match/v1/matches/${matchId}`).json<MatchApiResponse>()

	return mapMatchApiToMatch(match)
}

export const useGetMatch = (matchId: string) => {
	return useQuery({
		queryKey: ['match', matchId],
		queryFn: async () => await getMatch(matchId),
		enabled: computed(() => !!matchId)
	})
}
