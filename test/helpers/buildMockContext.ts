import { MockContext } from '../types/MockContext'
import { MockContextCall } from '../types/MockContextCall'
import { MockContextMethod } from '../types/MockContextMethod'
import { noop } from './noop'
import Spy = jasmine.Spy

const buildMockContext: (_?: {
	contextCallsOrder?: MockContextCall[], toBlobSpy?: Spy,
}) => MockContext = params => {
	const { contextCallsOrder = [], toBlobSpy = undefined } = params || {}

	return {
		beginPath: () => contextCallsOrder.push({ method: MockContextMethod.BeginPath }),
		canvas: { toBlob: toBlobSpy },
		clearRect: () => contextCallsOrder.push({ method: MockContextMethod.ClearRect }),
		clip: () => contextCallsOrder.push({ method: MockContextMethod.Clip }),
		closePath: () => contextCallsOrder.push({ method: MockContextMethod.ClosePath }),
		drawImage: noop,
		fill: () => contextCallsOrder.push({ method: MockContextMethod.Fill }),
		fillStyle: '',
		globalCompositeOperation: '',
		lineTo: (x, y) => contextCallsOrder.push({ method: MockContextMethod.LineTo, x, y }),
		moveTo: (x, y) => contextCallsOrder.push({ method: MockContextMethod.MoveTo, x, y }),
		restore: () => contextCallsOrder.push({ method: MockContextMethod.Restore }),
		save: () => contextCallsOrder.push({ method: MockContextMethod.Save }),
	}
}

export { buildMockContext }
