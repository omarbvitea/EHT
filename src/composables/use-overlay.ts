import { ref } from 'vue'

const isLoading = ref(false)

export const useOverlay = () => {
	const start = () => {
		isLoading.value = true
	}

	const end = () => {
		isLoading.value = false
	}

	return {
		start,
		end,
		isLoading
	}
}
