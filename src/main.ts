import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'

import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import router from './router'

import type { Component } from 'vue'

const EHTPreset = definePreset(Aura, {
	primitive: {
		ehtred: {
			50: '#fef2f3',
			100: '#fde3e5',
			200: '#fbccd0',
			300: '#f17179',
			400: '#da032d',
			500: '#c2022a',
			600: '#a10224',
			700: '#850322',
			800: '#6f0621',
			900: '#5a0519',
			950: '#3e010d'
		}
	},
	semantic: {
		primary: {
			50: '{ehtred.50}',
			100: '{ehtred.100}',
			200: '{ehtred.200}',
			300: '{ehtred.300}',
			400: '{ehtred.400}',
			500: '{ehtred.500}',
			600: '{ehtred.600}',
			700: '{ehtred.700}',
			800: '{ehtred.800}',
			900: '{ehtred.900}',
			950: '{ehtred.950}'
		},
		colorScheme: {
			light: {
				primary: {
					color: '{ehtred.400}',
					contrastColor: '#ffffff',
					hoverColor: '{ehtred.500}',
					activeColor: '{ehtred.600}'
				},
				surface: {
					0: '#ffffff',
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#eeeeee',
					300: '#e0e0e0',
					400: '#bdbdbd',
					500: '#9e9e9e',
					600: '#757575',
					700: '#616161',
					800: '#424242',
					900: '#212121',
					950: '#0a0a0a'
				}
			},
			dark: {
				primary: {
					color: '{ehtred.400}',
					contrastColor: '#ffffff',
					hoverColor: '{ehtred.300}',
					activeColor: '{ehtred.200}'
				},
				surface: {
					0: '#ffffff',
					50: '#fafafa',
					100: '#f5f5f5',
					200: '#eeeeee',
					300: '#e0e0e0',
					400: '#bdbdbd',
					500: '#9e9e9e',
					600: '#757575',
					700: '#616161',
					800: '#424242',
					900: '#212121',
					950: '#0a0a0a'
				}
			}
		}
	}
})

const app = createApp(App as Component)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, {
	queryClientConfig: {
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 10,
				retry: 1,
				refetchOnWindowFocus: false
			}
		}
	}
})
app.use(PrimeVue, {
	theme: {
		preset: EHTPreset
	}
})
app.use(ToastService)

app.mount('#app')
