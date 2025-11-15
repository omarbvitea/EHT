import { colorByTrait } from '@/shared/traits/colors'

export const ComposChartOptions = {
	indexAxis: 'x',
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			display: false
		}
	}
}

export const getComposChartConfig = (data: object) => {
	const labels = Object.keys(data)

	return {
		labels,
		datasets: [
			{
				backgroundColor: labels.map((label) => colorByTrait[label] ?? '#4b5563'),
				borderColor: Array(labels.length).fill('#121212'),
				borderWidth: 5,
				minBarLength: 8,
				data: Object.values(data)
			}
		]
	}
}
