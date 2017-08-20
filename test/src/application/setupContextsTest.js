import store from '../../../store'
import setupContexts from '../../../src/application/setupContexts'

describe('setup contexts', () => {
	beforeEach(() => {
		store.canvases = [
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
		]
	})

	it('adds a context to the store for each canvas', () => {
		expect(store.contexts).toEqual([])

		setupContexts()

		expect(store.contexts).toEqual([ 'c', 'c', 'c', 'c', 'c', 'c' ])
	})

	it('can reduce the count of contexts in the store', () => {
		setupContexts()
		expect(store.contexts).toEqual([ 'c', 'c', 'c', 'c', 'c', 'c' ])

		store.canvases = [
			{ getContext: context => context === '2d' ? 'c' : '' },
			{ getContext: context => context === '2d' ? 'c' : '' },
		]
		setupContexts()

		expect(store.contexts).toEqual([ 'c', 'c' ])
	})
})
