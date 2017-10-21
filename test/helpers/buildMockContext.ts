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
		beginPath: () => contextCallsOrder.push({ method: MockContextMethod.BEGIN_PATH }),
		canvas: { toBlob: toBlobSpy },
		clearRect: () => contextCallsOrder.push({ method: MockContextMethod.CLEAR_RECT }),
		clip: () => contextCallsOrder.push({ method: MockContextMethod.CLIP }),
		closePath: () => contextCallsOrder.push({ method: MockContextMethod.CLOSE_PATH }),
		drawImage: noop,
		fill: () => contextCallsOrder.push({ method: MockContextMethod.FILL }),
		fillStyle: '',
		globalCompositeOperation: '',
		lineTo: (x, y) => contextCallsOrder.push({ method: MockContextMethod.LINE_TO, x, y }),
		moveTo: (x, y) => contextCallsOrder.push({ method: MockContextMethod.MOVE_TO, x, y }),
		restore: () => contextCallsOrder.push({ method: MockContextMethod.RESTORE }),
		save: () => contextCallsOrder.push({ method: MockContextMethod.SAVE }),
	}
}

export { buildMockContext }
