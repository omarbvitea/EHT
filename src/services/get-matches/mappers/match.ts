import type { Match } from '@/shared/types'

import type {
	MatchApiResponse,
	ParticipantApiResponse,
	TraitApiResponse,
	UnitApiResponse
} from '../types'

export const mapMatchApiToMatch = (apiResponse: MatchApiResponse): Match => {
	return {
		id: apiResponse.metadata.match_id,
		type: apiResponse.info.tft_game_type,
		set: {
			name: apiResponse.info.tft_set_core_name,
			number: apiResponse.info.tft_set_number
		},
		members: apiResponse.info.participants.map((participant: ParticipantApiResponse) => ({
			puuid: participant.puuid,
			hero: participant.companion.species,
			gold_left: participant.gold_left,
			level: participant.level,
			placement: participant.placement,
			players_eliminated: participant.players_eliminated,
			name: participant.riotIdGameName,
			tag: participant.riotIdTagline,
			win: participant.win,
			damage_to_players: participant.total_damage_to_players,
			traits: participant.traits.map((trait: TraitApiResponse) => ({
				name: trait.name,
				quantity: trait.num_units
			})),
			units: participant.units.map((unit: UnitApiResponse) => ({
				name: unit.character_id,
				items: unit.itemNames
			}))
		}))
	}
}
