import { MockContext } from '../types/MockContext'
import { MockContextCall } from '../types/MockContextCall'
import { noop } from './noop'
import Spy = jasmine.Spy

interface BuildMockContext { contextCallsOrder?: MockContextCall[], toBlobSpy?: Spy }

const buildMockContext: (_?: BuildMockContext) => MockContext = (params: BuildMockContext) => {
	const { contextCallsOrder = [], toBlobSpy = undefined }: BuildMockContext = params || {}

	return {
		beginPath: () => contextCallsOrder.push({ method: 'beginPath' }),
		canvas: { toBlob: toBlobSpy },
		clearRect: () => contextCallsOrder.push({ method: 'clearRect' }),
		clip: () => contextCallsOrder.push({ method: 'clip' }),
		closePath: () => contextCallsOrder.push({ method: 'closePath' }),
		drawImage: noop,
		fill: () => contextCallsOrder.push({ method: 'fill' }),
		fillStyle: '',
		globalCompositeOperation: '',
		lineTo: (x: number, y: number) => contextCallsOrder.push({ method: 'lineTo', x, y }),
		moveTo: (x: number, y: number) => contextCallsOrder.push({ method: 'moveTo', x, y }),
		restore: () => contextCallsOrder.push({ method: 'restore' }),
		save: () => contextCallsOrder.push({ method: 'save' }),
	}
}

export { buildMockContext }
