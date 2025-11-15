import type { GetNameResponse } from '@/services/get-name/types'
import { america } from '@/shared/http'

export const fetchNameByPuuid = async (puuid: string): Promise<string> => {
	const response = await america
		.get(`riot/account/v1/accounts/by-puuid/${puuid}`)
		.json<GetNameResponse>()

	return response.gameName
}
