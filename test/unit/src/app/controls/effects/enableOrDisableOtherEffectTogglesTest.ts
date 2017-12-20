// tslint:disable:no-object-literal-type-assertion

import {
	appState,
	Effect,
	effectsHaveConflicts,
	enableOrDisableOtherEffectToggles,
	NamedEffect,
} from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('enableOrDisableOtherEffectToggles', () => {
	let subject: () => void
	beforeEach(() => {
		subject = enableOrDisableOtherEffectToggles.default
	})

	it('checks each available effect for conflicts with the effects the user currently has combined', () => {
		appState.settings.combinedEffects = { basePattern: { colorSettings: { opacity: 0.5 } } }

		const effectOne: NamedEffect = {
			basePattern: { colorSettings: { opacity: 0.33 } },
			description: '',
			name: 'effect one',
		}
		const effectTwo: NamedEffect = {
			basePattern: { colorSettings: { opacity: 0.66 } },
			description: '',
			name: 'effect two',
		}
		appState.settings.availableEffects = {
			'effect-one': effectOne,
			'effect-two': effectTwo,
		}

		appState.dom.effectToggles = {
			'effect-one': {} as HTMLInputElement,
			'effect-two': {} as HTMLInputElement,
		}

		const effectsHaveConflictsSpy: Spy = spyOn(effectsHaveConflicts, 'default')
		effectsHaveConflictsSpy.and.callFake(({ effect }: { effect: Effect }): boolean =>
			!!(effect.basePattern && effect.basePattern.colorSettings && effect.basePattern.colorSettings.opacity === 0.33))

		subject()

		expect(effectsHaveConflictsSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({
			effect: effectOne,
			effectCheckingAgainst: appState.settings.combinedEffects,
		})
		expect(effectsHaveConflictsSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({
			effect: effectTwo,
			effectCheckingAgainst: appState.settings.combinedEffects,
		})
		expect(appState.dom.effectToggles[ 'effect-one' ].disabled).toBe(true)
		expect(appState.dom.effectToggles[ 'effect-two' ].disabled).toBe(false)
	})
})
