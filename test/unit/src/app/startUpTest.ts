import {
	attachControlHandlers,
	createEffectToggles,
	executeSelectedEffects,
	NamedEffect,
	setupAvailableEffects,
	setupMixedDownContext,
	startUp,
	storeDomElements,
} from '../../../../src/indexForTest'

describe('start up', () => {
	let subject: (_: NamedEffect[]) => void
	let allEffects: NamedEffect[]
	beforeEach(() => {
		subject = startUp.default

		spyOn(storeDomElements, 'default')
		spyOn(setupAvailableEffects, 'default')
		spyOn(setupMixedDownContext, 'default')
		spyOn(createEffectToggles, 'default')
		spyOn(attachControlHandlers, 'default')
		spyOn(executeSelectedEffects, 'default')
		allEffects = [ { name: 'mock effect', description: '' } ]

		subject(allEffects)
	})

	it('stores dom elements on the app state', () => {
		expect(storeDomElements.default).toHaveBeenCalled()
	})

	it('sets the available effects from all the effects in the effects module', () => {
		expect(setupAvailableEffects.default).toHaveBeenCalledWith(allEffects)
	})

	it('sets up the mixed down context', () => {
		expect(setupMixedDownContext.default).toHaveBeenCalled()
	})

	it('creates the effect toggles from all the effects in the effects module', () => {
		expect(createEffectToggles.default).toHaveBeenCalledWith(allEffects)
	})

	it('attaches handlers to all the controls', () => {
		expect(attachControlHandlers.default).toHaveBeenCalled()
	})

	it('executes the pattern once so the canvas is not blank when the user arrives', () => {
		expect(executeSelectedEffects.default).toHaveBeenCalled()
	})
})
