import { getMatch } from '@/services/get-matches/get-match'
import type { Match } from '@/shared/types'
import { sleep } from '@/shared/utils'

import type { QueryClient } from '@tanstack/vue-query'

export const useFetchMatches = async (ids: string[], queryClient: QueryClient) => {
	const matches: Match[] = []

	for (const id of ids) {
		await sleep(90)
		const match = await queryClient.fetchQuery({
			queryKey: ['match', id],
			queryFn: () => getMatch(id)
		})
		matches.push(match)
	}

	return matches
}
