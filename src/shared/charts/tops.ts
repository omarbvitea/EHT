export const TopsChartOptions = {
	indexAxis: 'x',
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			display: false
		}
	},
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				stepSize: 1
			},
			title: {
				display: true
			}
		}
	}
}

export const getTopChartConfig = (data: object) => {
	return {
		labels: ['Top 1', 'Top 2', 'Top 3', 'Top 4', 'Top 5', 'Top 6', 'Top 7', 'Top 8'],
		datasets: [
			{
				backgroundColor: [
					'#da032d',
					'#c2022a',
					'#a10224',
					'#850322',
					'#6f0621',
					'#5a0519',
					'#3e010d',
					'#2a0109'
				],
				borderColor: Array(8).fill('#121212'),
				borderWidth: 5,
				minBarLength: 8,
				borderRadius: 12,
				data: Object.values(data)
			}
		]
	}
}
