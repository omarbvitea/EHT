export interface TraitApiResponse {
  name: string
  num_units: number
}

export interface UnitApiResponse {
  character_id: string
  itemNames: string[]
}

export interface ParticipantApiResponse {
  puuid: string
  companion: {
    species: string
  }
  gold_left: number
  level: number
  placement: number
  players_eliminated: number
  riotIdGameName: string
  riotIdTagline: string
  total_damage_to_players: number
  win: boolean
  traits: TraitApiResponse[]
  units: UnitApiResponse[]
}

export interface MatchApiResponse {
  metadata: {
    match_id: string
  }
  info: {
    tft_game_type: string
    tft_set_core_name: string
    tft_set_number: number
    participants: ParticipantApiResponse[]
  }
}
