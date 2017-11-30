import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { mixDownContexts, setSetting, state, to } from '../../../../../src'

describe('mix down contexts', () => {
	const drawImageSpy: Spy = jasmine.createSpy('drawImage')
	const clearRectSpy: Spy = jasmine.createSpy('clearRect')
	beforeEach(() => {
		state.mixedDownContext = { drawImage: drawImageSpy, clearRect: clearRectSpy }
	})

	it('clears the mixed down canvas just before rendering', () => {
		setSetting.default('canvasSize', to.Px(555))

		mixDownContexts.default()

		expect(clearRectSpy).toHaveBeenCalledWith(0, 0, 555, 555)
	})

	it('draws each of the contexts in turn onto the mixedDownContext', () => {
		state.contexts = [
			{ canvas: 0 },
			{ canvas: 1 },
			{ canvas: 2 },
			{ canvas: 3 },
			{ canvas: 4 },
			{ canvas: 5 },
		]

		mixDownContexts.default()

		const drawImageSpyCalls: CallInfo[] = drawImageSpy.calls.all()
		expect(drawImageSpyCalls[0].args[0]).toEqual(0)
		expect(drawImageSpyCalls[1].args[0]).toEqual(1)
		expect(drawImageSpyCalls[2].args[0]).toEqual(2)
		expect(drawImageSpyCalls[3].args[0]).toEqual(3)
		expect(drawImageSpyCalls[4].args[0]).toEqual(4)
		expect(drawImageSpyCalls[5].args[0]).toEqual(5)
	})
})
