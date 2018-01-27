import {
	attachHandlers,
	createOverrideNodes,
	NamedEffect,
	setupMixedDownContext,
	startUpApp,
	storeDomElements,
	updateOverrides,
} from '../../../../src/indexForTest'

describe('start up app', () => {
	let subject: (_: NamedEffect[]) => void
	let allEffects: NamedEffect[]
	beforeEach(() => {
		subject = startUpApp.default

		spyOn(storeDomElements, 'default')
		spyOn(createOverrideNodes, 'default')
		spyOn(setupMixedDownContext, 'default')
		spyOn(updateOverrides, 'default')
		spyOn(attachHandlers, 'default')
		allEffects = [ { name: 'mock effect', description: '' } ]

		subject(allEffects)
	})

	it('stores dom elements on the app state', () => {
		expect(storeDomElements.default).toHaveBeenCalled()
	})

	it('creates the object describing the ui state of the override controls', () => {
		expect(createOverrideNodes.default).toHaveBeenCalled()
	})

	it('sets up the mixed down context', () => {
		expect(setupMixedDownContext.default).toHaveBeenCalled()
	})

	it('sets up the override', () => {
		expect(updateOverrides.default).toHaveBeenCalled()
	})

	it('attaches handlers to all the controls', () => {
		expect(attachHandlers.default).toHaveBeenCalled()
	})
})
