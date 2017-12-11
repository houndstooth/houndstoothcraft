import { appState } from '../../../../src/app/appState'
import {
	attachControlHandlers,
	buildSettingNamesToPathsMap,
	createEffectToggles,
	executeSelectedEffects,
	NamedEffect,
	startUp,
	storeDomElements,
	storeMixedDownContext,
} from '../../../../src/indexForTest'

const subject: (_: NamedEffect[]) => void = startUp.default

describe('start up', () => {
	let allEffects: NamedEffect[]
	beforeEach(() => {
		spyOn(storeDomElements, 'default')
		spyOn(buildSettingNamesToPathsMap, 'default')
		spyOn(storeMixedDownContext, 'default')
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
		expect(appState.settings.availableEffects).toBe(allEffects)
	})

	it('builds the setting name to settings path map', () => {
		expect(buildSettingNamesToPathsMap.default).toHaveBeenCalled()
	})

	it('stores the mixed down context onto the app state', () => {
		expect(storeMixedDownContext.default).toHaveBeenCalled()
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
