export default contextCallsOrder => ({
	beginPath: () => contextCallsOrder.push({ method: 'beginPath' }),
	moveTo: (x, y) => contextCallsOrder.push({ method: 'moveTo', x, y }),
	lineTo: (x, y) => contextCallsOrder.push({ method: 'lineTo', x, y }),
	closePath: () => contextCallsOrder.push({ method: 'closePath' }),
	fill: () => contextCallsOrder.push({ method: 'fill' }),
	clip: () => contextCallsOrder.push({ method: 'clip' }),
})
