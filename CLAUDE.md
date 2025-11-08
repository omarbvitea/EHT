# Vue Project - League of Legends Stats

## Descripción del Proyecto

Aplicación Vue 3 para consultar estadísticas de jugadores de League of Legends usando la API de Riot Games.

## Stack Tecnológico

### Frontend Framework

- **Vue 3** con Composition API y `<script setup>`
- **TypeScript** para type safety
- **Vite** como build tool y dev server

### UI Libraries

- **PrimeVue 4.x** - Componentes UI principales
  - InputText, Button, InputGroup, Message, Toast
  - FloatLabel para labels flotantes
  - Astra theme
- **Tailwind CSS** - Utility-first CSS framework
- **PrimeIcons** - Sistema de iconos

### Form Management

- **VeeValidate 4.x** - Validación de formularios
  - Integrado con Zod para schemas de validación
  - `useForm` para manejo de estado del formulario
  - `defineField` para campos individuales
- **Zod 3.x** - Schema validation (downgraded de v4 por compatibilidad con VeeValidate)

### HTTP & State Management

- **ky** - Cliente HTTP moderno
- **TanStack Query (Vue Query)** - Data fetching y cache
  - `useMutation` para operaciones bajo demanda (búsquedas)
  - Configurado con retry automático

### Code Quality

- **ESLint** con configuración flat (eslint.config.js)
  - TypeScript ESLint
  - Vue ESLint plugin
  - Import ordering automático
  - Prettier integration
- **unplugin-auto-import** - Auto-import de composables de Vue
- **unplugin-vue-components** - Auto-import de componentes de PrimeVue

## Configuración de Variables de Entorno

El proyecto usa variables de entorno de Vite (prefijo `VITE_`):

```env
VITE_RIOT_TOKEN=RGAPI-xxxxxxxxx
```

## API de Riot Games

### Endpoint Principal

- **Base URL Americas:** `https://americas.api.riotgames.com`
- **Autenticación:** Header `X-Riot-Token` con API key

### Endpoint Usado

- `GET /riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
  - Retorna el PUUID del jugador
  - Requiere nombre de invocador y tag (sin el #)

## Reglas de Código Estrictas

### 1. NUNCA usar `any`

❌ **Prohibido:**

```typescript
const data: any = await fetch()
function process(item: any) {}
```

✅ **Correcto:**

```typescript
const data: UserData = await fetch()
function process(item: User) {}
// Si realmente no sabes el tipo, usa unknown y type guards
const data: unknown = await fetch()
```

**ESLint está configurado con `@typescript-eslint/no-explicit-any: 'error'`** - El build fallará si usas `any`.

### 2. SIEMPRE usar Mappers para respuestas de API

Cada endpoint debe tener:

1. **Tipo de respuesta de la API** (cómo viene del backend)
2. **Tipo de dominio** (cómo lo usamos en la app)
3. **Mapper function** que transforma entre ellos

**Ejemplo completo:**

```typescript
// 1. Tipo de la API (cómo viene el JSON crudo)
interface RiotAccountApiResponse {
  puuid: string
  gameName: string
  tagLine: string
}

// 2. Tipo de dominio (cómo lo usamos en la app)
interface PlayerAccount {
  id: string
  username: string
  tag: string
}

// 3. Mapper function
const mapRiotAccountToPlayerAccount = (apiResponse: RiotAccountApiResponse): PlayerAccount => {
  return {
    id: apiResponse.puuid,
    username: apiResponse.gameName,
    tag: apiResponse.tagLine
  }
}

// 4. Uso en el servicio
const fetchPuuidByUserTag = async (name: string, tag: string): Promise<PlayerAccount> => {
  const apiResponse = await riot_america
    .get(`riot/account/v1/accounts/by-riot-id/${name}/${tag}`)
    .json<RiotAccountApiResponse>()

  return mapRiotAccountToPlayerAccount(apiResponse)
}
```

**¿Por qué mappers?**

- Desacopla tu app de la estructura de la API externa
- Si la API cambia, solo actualizas el mapper
- Permite renombrar campos a nombres más claros
- Facilita transformaciones (dates, enums, nested objects)

### 3. Type Safety en todas partes

```typescript
// ✅ Props tipados
interface Props {
  username: string
  isActive: boolean
}
const props = defineProps<Props>()

// ✅ Emits tipados
interface Emits {
  (e: 'submit', value: string): void
  (e: 'cancel'): void
}
const emit = defineEmits<Emits>()

// ✅ Refs tipados
const count = ref<number>(0)
const user = ref<User | null>(null)

// ✅ Computed tipados
const fullName = computed<string>(() => `${user.value?.name} ${user.value?.lastName}`)
```

## Patrones de Código Importantes

### 1. Formularios con VeeValidate + Zod

```typescript
const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    tag: z.string().min(1, 'El tag es requerido')
  })
)

const { errors, handleSubmit, submitCount, defineField } = useForm({
  validationSchema,
  initialValues: { name: '', tag: '' }
})

const [name] = defineField('name')
const [tag] = defineField('tag')
```

### 2. Mutations con TanStack Query

```typescript
export const useGetPuuidByUserTag = () => {
  return useMutation({
    mutationFn: async ({ name, tag }: { name: string; tag: string }) => {
      const response = await fetchPuuidByUserTag(name, tag)
      return response.puuid
    }
  })
}

// Uso en componente
const { mutate: searchPuuid } = useGetPuuidByUserTag()
searchPuuid({ name: 'player', tag: '1234' })
```

### 3. Estructura de un servicio completo

```typescript
// services/get-player-stats/get-player-stats.ts

// 1. API Response Type
interface PlayerStatsApiResponse {
  player_id: string
  total_games: number
  win_rate: number
  last_played: string
}

// 2. Domain Type
interface PlayerStats {
  playerId: string
  totalGames: number
  winRate: number
  lastPlayed: Date
}

// 3. Mapper
const mapPlayerStatsApiToPlayerStats = (api: PlayerStatsApiResponse): PlayerStats => {
  return {
    playerId: api.player_id,
    totalGames: api.total_games,
    winRate: api.win_rate,
    lastPlayed: new Date(api.last_played)
  }
}

// 4. Fetch function
const fetchPlayerStats = async (puuid: string): Promise<PlayerStats> => {
  const apiResponse = await riot_america
    .get(`lol/summoner/v4/summoners/by-puuid/${puuid}`)
    .json<PlayerStatsApiResponse>()

  return mapPlayerStatsApiToPlayerStats(apiResponse)
}

// 5. Composable
export const useGetPlayerStats = () => {
  return useMutation({
    mutationFn: async ({ puuid }: { puuid: string }) => {
      return await fetchPlayerStats(puuid)
    }
  })
}
```

### 4. Auto-imports

Los siguientes se importan automáticamente:

- Composables de Vue: `ref`, `computed`, `watch`, `onMounted`, etc.
- Componentes de PrimeVue: `Button`, `InputText`, `Message`, etc.

No necesitan `import` explícito.

## Decisiones de Diseño

### ¿Por qué useMutation para un GET?

Aunque es un GET, se usa `useMutation` porque:

- La búsqueda debe ejecutarse solo cuando el usuario hace submit
- No queremos que se ejecute automáticamente al cargar
- `useQuery` está diseñado para cargar datos automáticamente
- `useMutation` es perfecto para operaciones bajo demanda

### ¿Por qué Zod v3 en lugar de v4?

VeeValidate aún no soporta Zod v4. Se hizo downgrade para compatibilidad.

### ¿Por qué no usar PrimeVue Forms?

Se probó inicialmente pero resultó demasiado complejo. VeeValidate ofrece:

- API más simple y directa
- Mejor integración con Zod
- Más control sobre el comportamiento de validación
- Menos código boilerplate

### ¿Por qué mappers obligatorios?

- **Separación de concerns:** API externa vs lógica interna
- **Mantenibilidad:** Cambios en la API no rompen toda la app
- **Claridad:** Nombres de campos más descriptivos
- **Type safety:** Tipos específicos del dominio

## Errores Comunes y Soluciones

### 1. "vue-query hooks can only be used inside setup()"

**Problema:** Intentar llamar `useQuery()` dentro de un callback.
**Solución:** Usar `useMutation` inicializado en setup y llamar a `mutate()` en el callback.

### 2. Variables de entorno no se cargan

**Problema:** Variables sin prefijo `VITE_`.
**Solución:** Todas las variables expuestas al cliente deben empezar con `VITE_`. Reiniciar dev server.

### 3. Inputs de PrimeVue no capturan valores con VeeValidate

**Problema:** Usar `name` attribute no funciona con componentes custom.
**Solución:** Usar `defineField` y `v-model`:

```vue
const [username] = defineField('username')
<InputText v-model="username" />
```

### 4. Errores se muestran al cargar el formulario

**Problema:** VeeValidate valida por defecto al montar.
**Solución:** Usar `submitCount` para mostrar errores solo después del primer submit:

```vue
<Message v-if="errors.username && submitCount > 0"></Message>
```

### 5. ESLint error: "Unexpected any"

**Problema:** Usar `any` en el código.
**Solución:** Definir tipos específicos o usar `unknown` con type guards:

```typescript
// ❌ Malo
const data: any = response

// ✅ Bueno
const data: UserData = response

// ✅ Si no conoces el tipo, usa unknown
const data: unknown = response
if (isUserData(data)) {
  // ahora data es UserData
}
```

## Scripts Disponibles

```bash
npm run dev          # Inicia dev server (NO ejecutar - lo maneja el usuario)
npm run build        # Build para producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y auto-fix
```

## Reglas de Ejecución de Comandos

### ❌ NUNCA ejecutar comandos que mantienen puertos abiertos

**Prohibido ejecutar:**

- `npm run dev`
- `npm run serve`
- `npm start`
- Cualquier servidor de desarrollo
- Procesos que queden en background

**Razón:** El usuario maneja manualmente estos procesos. Claude solo debe modificar código, no gestionar servidores.

### ✅ Sí puede ejecutar:

- `npm install <paquete>`
- `npm run lint`
- `npm run build`
- `npm run test` (si son tests unitarios rápidos)
- Comandos de git
- Comandos de lectura/verificación

Si el usuario necesita reiniciar el servidor, **solo informarle** que debe hacerlo manualmente.

## TODOs / Próximos Pasos

- [ ] Implementar manejo de errores de la API (toast de error)
- [ ] Mostrar loading state durante búsqueda
- [ ] Guardar PUUID y hacer siguiente request con los datos del jugador
- [ ] Implementar rate limiting client-side
- [ ] Agregar tests unitarios
- [ ] Implementar cache de búsquedas recientes
- [ ] Crear mappers para todas las respuestas de API existentes
