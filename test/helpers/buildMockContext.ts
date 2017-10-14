import noop from './noop'
import { MockContext } from './types'
import { NullarySideEffector } from '../../src/utilities/types'

type BuildMockContext = { ({}?: { contextCallsOrder?, toBlobSpy? }): MockContext }

const buildMockContext: BuildMockContext = ({ contextCallsOrder = [], toBlobSpy = null } = {}) => ({
	beginPath: (() => contextCallsOrder.push({ method: 'beginPath' })) as NullarySideEffector,
	moveTo: ((x, y) => contextCallsOrder.push({ method: 'moveTo', x, y })) as NullarySideEffector,
	lineTo: ((x, y) => contextCallsOrder.push({ method: 'lineTo', x, y })) as NullarySideEffector,
	closePath: (() => contextCallsOrder.push({ method: 'closePath' })) as NullarySideEffector,
	fill: (() => contextCallsOrder.push({ method: 'fill' })) as NullarySideEffector,
	clip: (() => contextCallsOrder.push({ method: 'clip' })) as NullarySideEffector,
	save: (() => contextCallsOrder.push({ method: 'save' })) as NullarySideEffector,
	restore: (() => contextCallsOrder.push({ method: 'restore' })) as NullarySideEffector,
	clearRect: (() => contextCallsOrder.push({ method: 'clearRect' })) as NullarySideEffector,
	canvas: { toBlob: toBlobSpy },
	drawImage: noop as NullarySideEffector,
	globalCompositeOperation: '',
	fillStyle: '',
})

export default buildMockContext
