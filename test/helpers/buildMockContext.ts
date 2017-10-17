import { NullarySideEffector } from '../../src/utilities/types'
import MockContext from '../types/MockContext'
import noop from './noop'

const buildMockContext: {
	({}?: { contextCallsOrder?, toBlobSpy? }): MockContext,
} = params => {
	const { contextCallsOrder = [], toBlobSpy = undefined } = params || {}

	return {
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
		drawImage: noop,
		globalCompositeOperation: '',
		fillStyle: '',
	}
}

export default buildMockContext
