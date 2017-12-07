import {
	appState,
	combineEffects,
	Effect,
	effectsHaveConflicts,
	enableOrDisableOtherEffectToggles,
	NamedEffect,
	NullarySideEffector,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'
import Spy = jasmine.Spy

const subject: NullarySideEffector = enableOrDisableOtherEffectToggles.default

describe('enableOrDisableOtherEffectToggles', () => {
	it('checks each available effect for conflicts with the effects the user currently has combined', () => {
		const effectsSelected: NamedEffect[] = []
		appState.controls.selectedEffects = effectsSelected

		const effectsCombined: Effect = { name: 'effects combined' }
		spyOn(combineEffects, 'default').and.returnValue(effectsCombined)

		const effectOne: NamedEffect = { name: 'effect one', description: '' }
		const effectTwo: NamedEffect = { name: 'effect two', description: '' }
		appState.settings.availableEffects = [ effectOne, effectTwo ]

		appState.dom.effectToggles = { 'effect one': buildMockElement(), 'effect two': buildMockElement() }

		const effectsHaveConflictsSpy: Spy = spyOn(effectsHaveConflicts, 'default')
		effectsHaveConflictsSpy.and.callFake(({ effect }: { effect: Effect }): boolean =>
			effect.name === 'effect one')

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
		expect(appState.dom.effectToggles['effect one'].disabled).toBe(true)
		expect(appState.dom.effectToggles['effect two'].disabled).toBe(false)
	})
})
