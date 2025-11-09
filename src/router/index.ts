import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../pages/Home.vue')
		},
		{
			path: '/summoner/:puuid',
			name: 'summoner',
			component: () => import('../pages/Summoner.vue')
		}
	]
})

export default router
