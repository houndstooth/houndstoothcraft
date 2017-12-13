import {
	appState,
	combineEffects,
	Effect,
	effectsHaveConflicts,
	enableOrDisableOtherEffectToggles,
	NamedEffect,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'
import Spy = jasmine.Spy

describe('enableOrDisableOtherEffectToggles', () => {
	let subject: () => void
	beforeEach(() => {
		subject = enableOrDisableOtherEffectToggles.default
	})

	it('checks each available effect for conflicts with the effects the user currently has combined', () => {
		const effectsSelected: NamedEffect[] = []
		appState.controls.selectedEffects = effectsSelected

		const effectsCombined: Effect = { basePattern: { colorSettings: { opacity: 0.5 } } }
		spyOn(combineEffects, 'default').and.returnValue(effectsCombined)

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
		appState.settings.availableEffects = [ effectOne, effectTwo ]

		appState.dom.effectToggles = {
			'effect one': buildMockElement() as HTMLInputElement,
			'effect two': buildMockElement() as HTMLInputElement,
		}

		const effectsHaveConflictsSpy: Spy = spyOn(effectsHaveConflicts, 'default')
		effectsHaveConflictsSpy.and.callFake(({ effect }: { effect: Effect }): boolean =>
			!!(effect.basePattern && effect.basePattern.colorSettings && effect.basePattern.colorSettings.opacity === 0.33))

		subject()

		expect(combineEffects.default).toHaveBeenCalledWith({ effects: effectsSelected })
		expect(effectsHaveConflictsSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({
			effect: effectOne,
			effectCheckingAgainst: effectsCombined,
		})
		expect(effectsHaveConflictsSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({
			effect: effectTwo,
			effectCheckingAgainst: effectsCombined,
		})
		expect(appState.dom.effectToggles[ 'effect one' ].disabled).toBe(true)
		expect(appState.dom.effectToggles[ 'effect two' ].disabled).toBe(false)
	})
})
