import { CreateMockContextParams, MockContext } from './types'

const createMockContext: (_?: CreateMockContextParams) => MockContext =
	(createMockContextParams: CreateMockContextParams = {}): MockContext => {
		const { contextCallsOrder = [], toBlobSpy, fillRectSpy, clearRectSpy, drawImageSpy } = createMockContextParams

		return {
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
		}
	}

export default createMockContext
