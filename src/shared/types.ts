export interface Trait {
	name: string
	quantity: number
}

export interface Unit {
	name: string
	items: string[]
}

export interface Member {
	puuid: string
	hero: string
	gold_left: number
	level: number
	placement: number
	players_eliminated: number
	name: string
	tag: string
	win: boolean
	damage_to_players: number
	traits: Trait[]
	units: Unit[]
}

export interface Match {
	id: string
	type: string
	set: {
		name: string
		number: number
	}
	members: Member[]
}
