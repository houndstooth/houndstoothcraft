import { MockContext } from '../types/MockContext'
import { MockContextCall } from '../types/MockContextCall'
import { noop } from './noop'
import Spy = jasmine.Spy

interface BuildMockContext {
	contextCallsOrder?: MockContextCall[],
	toBlobSpy?: Spy,
}

const buildMockContext: (_?: BuildMockContext) => MockContext =
	({ contextCallsOrder = [], toBlobSpy = undefined }: BuildMockContext = {}): MockContext =>
		({
			beginPath: (): number => contextCallsOrder.push({ method: 'beginPath' }),
			canvas: { toBlob: toBlobSpy },
			clearRect: (): number => contextCallsOrder.push({ method: 'clearRect' }),
			clip: (): number => contextCallsOrder.push({ method: 'clip' }),
			closePath: (): number => contextCallsOrder.push({ method: 'closePath' }),
			drawImage: noop,
			fill: (): number => contextCallsOrder.push({ method: 'fill' }),
			fillStyle: '',
			globalCompositeOperation: '',
			lineTo: (x: number, y: number): number => contextCallsOrder.push({ method: 'lineTo', x, y }),
			moveTo: (x: number, y: number): number => contextCallsOrder.push({ method: 'moveTo', x, y }),
			restore: (): number => contextCallsOrder.push({ method: 'restore' }),
			save: (): number => contextCallsOrder.push({ method: 'save' }),
		})

export { buildMockContext }
