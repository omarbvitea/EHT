import ky from 'ky'

const API_AMERICA = 'https://americas.api.riotgames.com'
const API_LAN = 'https://la1.api.riotgames.com'

const headers = {
	'X-Riot-Token': import.meta.env.VITE_RIOT_TOKEN as string
}

export const america = ky.create({
	prefixUrl: API_AMERICA,
	headers,
	retry: {
		limit: 2,
		methods: ['get']
	}
})

export const LAN = ky.create({
	prefixUrl: API_LAN,
	headers,
	retry: {
		limit: 2,
		methods: ['get']
	}
})
