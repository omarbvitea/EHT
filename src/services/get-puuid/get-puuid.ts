import { america } from '@/shared/http'

const mapPuuid = (response: { puuid: string }): string => {
	return response.puuid
}

export const fetchPuuidByUserTag = async (name: string, tag: string): Promise<string> => {
	const response = await america
		.get(`riot/account/v1/accounts/by-riot-id/${name}/${tag}`)
		.json<{ puuid: string }>()

	return mapPuuid(response)
}
