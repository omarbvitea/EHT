<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { useForm } from 'vee-validate'

import router from '@/router'
import { searchSummonerSchema } from '@/schemas'
import { fetchPuuidByUserTag } from '@/services/get-puuid/get-puuid'

const toast = useToast()

const isLoading = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const { errors, handleSubmit, submitCount, defineField } = useForm({
	validationSchema: searchSummonerSchema,
	initialValues: {
		name: '',
		tag: ''
	}
})

const [name] = defineField('name')
const [tag] = defineField('tag')

const onSubmit = handleSubmit(async (values) => {
	try {
		isLoading.value = true

		const puuid = await fetchPuuidByUserTag(values.name, values.tag)

		await router.push({ name: 'summoner', params: { puuid } })
	} catch (error) {
		toast.add({
			severity: 'error',
			summary: 'Error',
			detail: error as string,
			life: 3000
		})
	} finally {
		isLoading.value = false
	}
})

const forceVideoPlay = async () => {
	if (!videoRef.value) return

	await videoRef.value.play()
}

onMounted(() => {
	if (videoRef.value) {
		videoRef.value.addEventListener('loadeddata', () => {
			void forceVideoPlay()
		})
		videoRef.value.addEventListener('canplay', () => {
			void forceVideoPlay()
		})

		if (videoRef.value.readyState >= 3) {
			void forceVideoPlay()
		}
	}
})
</script>

<template>
	<div
		class="relative flex h-full w-full items-end justify-center overflow-hidden md:items-center md:justify-end"
	>
		<video
			ref="videoRef"
			src="/couch.mp4"
			autoplay
			loop
			muted
			playsinline
			class="fixed inset-0 z-0 h-screen w-screen object-cover"
		></video>
		<div class="fixed inset-0 z-[1] bg-black/40"></div>

		<form
			class="z-10 flex w-full max-w-md flex-col items-start gap-3 rounded-lg bg-[#18181b] p-5 shadow-2xl shadow-black/70 md:mr-12 md:mb-0 md:w-auto md:gap-4 md:p-6"
			@submit="onSubmit"
		>
			<h1 class="mb-3 text-xl font-bold text-white md:mb-5 md:text-2xl">Busca tu invocador</h1>
			<div class="flex w-full flex-col items-start gap-2">
				<div class="flex w-full flex-col gap-1">
					<InputGroup>
						<InputGroupAddon>
							<i class="pi pi-user text-sm md:text-base"></i>
						</InputGroupAddon>
						<InputText
							v-model="name"
							placeholder="Summoner"
							class="text-sm md:text-base"
							autocomplete="nickname"
							name="summoner"
						/>
					</InputGroup>
					<div class="min-h-6 w-full">
						<Message
							v-if="errors.name && submitCount > 0"
							severity="error"
							size="small"
							variant="simple"
							class="text-xs md:text-sm"
						>
							{{ errors.name }}
						</Message>
					</div>
				</div>
				<div class="flex w-full flex-col gap-1">
					<InputGroup class="w-full md:w-40">
						<InputGroupAddon class="text-sm md:text-base"> # </InputGroupAddon>
						<InputText
							v-model="tag"
							placeholder="Tag"
							class="text-sm md:text-base"
							autocomplete="on"
							name="tag"
						/>
					</InputGroup>
					<div class="min-h-6 w-full">
						<Message
							v-if="errors.tag && submitCount > 0"
							severity="error"
							size="small"
							variant="simple"
							class="text-xs md:text-sm"
						>
							{{ errors.tag }}
						</Message>
					</div>
				</div>
			</div>
			<Button type="submit" label="Buscar" :loading="isLoading" class="w-full" size="small" />
		</form>
	</div>
</template>
