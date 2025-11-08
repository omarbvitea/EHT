import { america } from '@/shared/http'
import type { Match } from '@/shared/types'
import { sleep } from '@/shared/utils'

import { getMatch } from './get-match'

export const getMatches = async (puuid: string): Promise<Match[]> => {
  const ids = await america.get<string[]>(`tft/match/v1/matches/by-puuid/${puuid}/ids`).json()

  const results: Match[] = []

  for (const id of ids) {
    await sleep(100)
    const match = await getMatch(id)
    results.push(match)
  }

  return results
}
