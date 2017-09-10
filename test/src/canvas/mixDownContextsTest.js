import mixDownContexts from '../../../src/canvas/mixDownContexts'
import state from '../../../state'

describe('mix down contexts', () => {
	it('draws each of the contexts in turn onto the mixedDownContext', () => {
		const drawImageSpy = jasmine.createSpy()
		state.mixedDownContext = { drawImage: drawImageSpy }

		state.contexts = [
			{ context: { canvas: 0 } },
			{ context: { canvas: 1 } },
			{ context: { canvas: 2 } },
			{ context: { canvas: 3 } },
			{ context: { canvas: 4 } },
			{ context: { canvas: 5 } },
		]

		mixDownContexts()

		const drawImageSpyCalls = drawImageSpy.calls.all()
		expect(drawImageSpyCalls[0].args[0]).toEqual(0)
		expect(drawImageSpyCalls[1].args[0]).toEqual(1)
		expect(drawImageSpyCalls[2].args[0]).toEqual(2)
		expect(drawImageSpyCalls[3].args[0]).toEqual(3)
		expect(drawImageSpyCalls[4].args[0]).toEqual(4)
		expect(drawImageSpyCalls[5].args[0]).toEqual(5)
	})
})
