import { noop } from '../../src'
import { BuildMockContext, MockContext } from './types'

const buildMockContext: (_?: BuildMockContext) => MockContext =
	({ contextCallsOrder = [], toBlobSpy, fillRectSpy, clearRectSpy, drawImageSpy }: BuildMockContext = {}): MockContext =>
		({
			beginPath: (): number => contextCallsOrder.push({ method: 'beginPath' }),
			canvas: { toBlob: toBlobSpy },
			clearRect: clearRectSpy || ((): number => contextCallsOrder.push({ method: 'clearRect' })),
			clip: (): number => contextCallsOrder.push({ method: 'clip' }),
			closePath: (): number => contextCallsOrder.push({ method: 'closePath' }),
			drawImage: drawImageSpy,
			fill: (): number => contextCallsOrder.push({ method: 'fill' }),
			fillRect: fillRectSpy,
			fillStyle: '#000000',
			globalAlpha: 1,
			globalCompositeOperation: '',
			lineTo: (x: number, y: number): number => contextCallsOrder.push({ method: 'lineTo', x, y }),
			moveTo: (x: number, y: number): number => contextCallsOrder.push({ method: 'moveTo', x, y }),
			restore: (): number => contextCallsOrder.push({ method: 'restore' }),
			save: (): number => contextCallsOrder.push({ method: 'save' }),
		})

export default buildMockContext
