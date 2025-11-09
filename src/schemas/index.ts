import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const searchSummonerSchema = toTypedSchema(
	z.object({
		name: z
			.string()
			.min(3, 'El nombre de invocador debe tener al menos 3 caracteres.')
			.max(16, 'El nombre de invocador no puede superar los 16 caracteres.')
			.regex(/^[A-Za-z0-9 _.-]+$/, 'El nombre de invocador contiene caracteres no válidos.'),

		tag: z
			.string()
			.min(2, 'El tag debe tener al menos 2 caracteres.')
			.max(5, 'El tag no puede superar los 5 caracteres.')
			.regex(/^[A-Za-z0-9]+$/, 'El tag solo puede contener letras y números.')
	})
)
