import Spy = jasmine.Spy
import CallInfo = jasmine.CallInfo
import { Context, createMixedDownContext, mixDownContexts, state } from '../../../../../src'

describe('mix down contexts', () => {
	const drawImageSpy: Spy = jasmine.createSpy('drawImage')
	const mixedDownContext: Context = { drawImage: drawImageSpy }
	beforeEach(() => {
		spyOn(createMixedDownContext, 'default').and.returnValue(mixedDownContext)
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

	it('creates the mixed down canvas if it is not already there', () => {
		expect(state.mixedDownContext).toBe(undefined)
		mixDownContexts.default()
		expect(state.mixedDownContext).toBe(mixedDownContext)
	})

	it('does not fail if there is no mixed down context', () => {
		mixDownContexts.default()
	})

	it('does not fail if already mixing down', () => {
		state.mixingDown = true
		mixDownContexts.default()
	})
})
