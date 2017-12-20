import {
	attachControlHandlers,
	createEffectToggles,
	createOverrideNodes,
	executePattern,
	NamedEffect,
	setupAvailableEffects,
	setupMixedDownContext,
	startUp,
	storeDomElements,
	updateOverrides,
} from '../../../../src/indexForTest'

describe('start up', () => {
	let subject: (_: NamedEffect[]) => void
	let allEffects: NamedEffect[]
	beforeEach(() => {
		subject = startUp.default

		spyOn(storeDomElements, 'default')
		spyOn(setupAvailableEffects, 'default')
		spyOn(createOverrideNodes, 'default')
		spyOn(setupMixedDownContext, 'default')
		spyOn(updateOverrides, 'default')
		spyOn(createEffectToggles, 'default')
		spyOn(attachControlHandlers, 'default')
		spyOn(executePattern, 'default')
		allEffects = [ { name: 'mock effect', description: '' } ]

		subject(allEffects)
	})

	it('stores dom elements on the app state', () => {
		expect(storeDomElements.default).toHaveBeenCalled()
	})

	it('sets the available effect from all the effect in the effect module', () => {
		expect(setupAvailableEffects.default).toHaveBeenCalledWith(allEffects)
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

	it('creates the effect toggles from all the effect in the effect module', () => {
		expect(createEffectToggles.default).toHaveBeenCalledWith(allEffects)
	})

	it('attaches handlers to all the controls', () => {
		expect(attachControlHandlers.default).toHaveBeenCalled()
	})

	it('executes the pattern once so the canvas is not blank when the user arrives', () => {
		expect(executePattern.default).toHaveBeenCalled()
	})
})
