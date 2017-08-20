import store from '../../../store'
import setupCanvases from '../../../src/application/setupCanvases'
import setupContexts from '../../../src/application/setupContexts'

describe('background color', () => {
	it('adds a context to the store for each canvas', () => {
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()
		expect(store.canvases.length).toBe(6)
		expect(store.contexts.length).toBe(0)

		setupContexts()

		expect(store.contexts.length).toBe(6)
	})

	it('can reduce the count of contexts in the store', () => {
		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 5 }
		setupCanvases()
		setupContexts()

		expect(store.contexts.length).toBe(6)

		store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: 3 }
		setupCanvases()
		setupContexts()

		expect(store.contexts.length).toBe(4)
	})
})
