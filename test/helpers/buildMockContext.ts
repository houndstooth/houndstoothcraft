import noop from './noop'

const buildMockContext = ({ contextCallsOrder = [], toBlobSpy }: { contextCallsOrder?, toBlobSpy? } = {}) => ({
	beginPath: () => contextCallsOrder.push({ method: 'beginPath' }),
	moveTo: (x, y) => contextCallsOrder.push({ method: 'moveTo', x, y }),
	lineTo: (x, y) => contextCallsOrder.push({ method: 'lineTo', x, y }),
	closePath: () => contextCallsOrder.push({ method: 'closePath' }),
	fill: () => contextCallsOrder.push({ method: 'fill' }),
	clip: () => contextCallsOrder.push({ method: 'clip' }),
	save: () => contextCallsOrder.push({ method: 'save' }),
	restore: () => contextCallsOrder.push({ method: 'restore' }),
	clearRect: () => contextCallsOrder.push({ method: 'clearRect' }),
	canvas: { toBlob: toBlobSpy },
	drawImage: noop,
	globalCompositeOperation: '',
	fillStyle: '',
})

export default buildMockContext
