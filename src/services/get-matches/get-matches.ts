import { america } from '@/shared/http'

export const getMatchesIds = async (
	puuid: string,
	start: number,
	count: number
): Promise<string[]> => {
	return await america
		.get(`tft/match/v1/matches/by-puuid/${puuid}/ids`, {
			searchParams: {
				start: start.toString(),
				count: count.toString()
			}
		})
		.json()
}
