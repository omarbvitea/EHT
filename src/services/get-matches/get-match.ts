import { america } from '@/shared/http'
import type { Match } from '@/shared/types'

import { mapMatchApiToMatch } from './mappers/match'

import type { MatchApiResponse } from './types'

export const getMatch = async (matchId: string): Promise<Match> => {
  const response = await america.get(`tft/match/v1/matches/${matchId}`).json<MatchApiResponse>()

  return mapMatchApiToMatch(response)
}
