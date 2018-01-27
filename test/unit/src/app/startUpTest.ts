import {
	createEffectToggles,
	executeEffect,
	NamedEffect,
	setupAvailableEffects,
	startUp,
	startUpApp,
} from '../../../../src/indexForTest'

describe('start up', () => {
	let subject: (_: NamedEffect[]) => void
	let allEffects: NamedEffect[]
	beforeEach(() => {
		subject = startUp.default

		spyOn(setupAvailableEffects, 'default')
		spyOn(createEffectToggles, 'default')
		spyOn(startUpApp, 'default')
		spyOn(executeEffect, 'default')
		allEffects = [ { name: 'mock effect', description: '' } ]

		subject(allEffects)
	})

	it('sets the available effect from all the effect in the effect module', () => {
		expect(setupAvailableEffects.default).toHaveBeenCalledWith(allEffects)
	})

	it('creates the effect toggles from all the effect in the effect module', () => {
		expect(createEffectToggles.default).toHaveBeenCalledWith(allEffects)
	})

	it('starts up the app', () => {
		expect(startUpApp.default).toHaveBeenCalled()
	})

	it('executes the pattern once so the canvas is not blank when the user arrives', () => {
		expect(executeEffect.default).toHaveBeenCalled()
	})
})
