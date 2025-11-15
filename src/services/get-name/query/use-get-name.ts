import { useQuery } from '@tanstack/vue-query'

import { fetchNameByPuuid } from '@/services/get-name/get-name'

export const useGetName = (puuid: string) => {
	return useQuery({
		queryKey: ['name', puuid],
		queryFn: async () => await fetchNameByPuuid(puuid),
		enabled: computed(() => !!puuid)
	})
}
