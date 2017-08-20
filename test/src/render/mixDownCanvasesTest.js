import mixDownCanvases from '../../../src/render/mixDownCanvases'
import setupCanvases from '../../../src/application/setupCanvases'
import store from '../../../store'

describe('mix down canvases', () => {
	it('draws each of the canvases in turn onto the mixedDownCanvas', () => {
		const drawImageSpy = jasmine.createSpy()
		const mockContext = { drawImage: drawImageSpy }
		store.mixedDownCanvas = {
			getContext: context => context === '2d' ? mockContext : null,
		}

		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()

		mixDownCanvases()

		const drawImageSpyCalls = drawImageSpy.calls.all()
		expect(drawImageSpyCalls[0].args[0]).toEqual(store.canvases[0])
		expect(drawImageSpyCalls[1].args[0]).toEqual(store.canvases[1])
		expect(drawImageSpyCalls[2].args[0]).toEqual(store.canvases[2])
		expect(drawImageSpyCalls[3].args[0]).toEqual(store.canvases[3])
		expect(drawImageSpyCalls[4].args[0]).toEqual(store.canvases[4])
		expect(drawImageSpyCalls[5].args[0]).toEqual(store.canvases[5])
	})
})
