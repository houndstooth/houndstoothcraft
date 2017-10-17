import { NullarySideEffector } from '../../src/utilities/types'
import MockContext from '../types/MockContext'
import noop from './noop'

const buildMockContext: ({}?: { contextCallsOrder?, toBlobSpy? }) => MockContext = params => {
	const { contextCallsOrder = [], toBlobSpy = undefined } = params || {}

	return {
		beginPath: (() => contextCallsOrder.push({ method: 'beginPath' })) as NullarySideEffector,
		canvas: { toBlob: toBlobSpy },
		clearRect: (() => contextCallsOrder.push({ method: 'clearRect' })) as NullarySideEffector,
		clip: (() => contextCallsOrder.push({ method: 'clip' })) as NullarySideEffector,
		closePath: (() => contextCallsOrder.push({ method: 'closePath' })) as NullarySideEffector,
		drawImage: noop,
		fill: (() => contextCallsOrder.push({ method: 'fill' })) as NullarySideEffector,
		fillStyle: '',
		globalCompositeOperation: '',
		lineTo: ((x, y) => contextCallsOrder.push({ method: 'lineTo', x, y })) as NullarySideEffector,
		moveTo: ((x, y) => contextCallsOrder.push({ method: 'moveTo', x, y })) as NullarySideEffector,
		restore: (() => contextCallsOrder.push({ method: 'restore' })) as NullarySideEffector,
		save: (() => contextCallsOrder.push({ method: 'save' })) as NullarySideEffector,
	}
}

export default buildMockContext
