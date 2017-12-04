import {
	combineHoundstoothEffects,
	documentWrapper,
	Effect,
	effectsHaveConflicts,
	enableOrDisableOtherEffectToggles,
	InputElement,
	NamedEffect,
	NullarySideEffector,
	state,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'
import Spy = jasmine.Spy

const subject: NullarySideEffector = enableOrDisableOtherEffectToggles.default

describe('enableOrDisableOtherEffectToggles', () => {
	it('checks each available effect for conflicts with the effects the user currently has combined', () => {
		const effectsSelected: NamedEffect[] = []
		state.controls.selectedHoundstoothEffects = effectsSelected

		const effectsCombined: Effect = { name: 'effects combined' }
		spyOn(combineHoundstoothEffects, 'default').and.returnValue(effectsCombined)

		const effectOne: NamedEffect = { name: 'effect one', description: '' }
		const effectTwo: NamedEffect = { name: 'effect two', description: '' }
		state.settings.availableEffects = [ effectOne, effectTwo ]

		const effectToggleOne: InputElement = buildMockElement()
		const effectToggleTwo: InputElement = buildMockElement()
		spyOn(documentWrapper, 'querySelector').and.callFake((selector: string): InputElement => {
			if (selector === '#effect-one') {
				return effectToggleOne
			}
			if (selector === '#effect-two') {
				return effectToggleTwo
			}

			return buildMockElement()
		})

		const effectsHaveConflictsSpy: Spy = spyOn(effectsHaveConflicts, 'default')
		effectsHaveConflictsSpy.and.callFake(({ effect }: { effect: Effect }): boolean =>
			effect.name === 'effect one')

		subject()

		expect(combineHoundstoothEffects.default).toHaveBeenCalledWith({ houndstoothEffects: effectsSelected })
		expect(effectsHaveConflictsSpy.calls.all()[ 0 ].args[ 0 ]).toEqual({
			effect: effectOne,
			effectCheckingAgainst: effectsCombined,
		})
		expect(effectsHaveConflictsSpy.calls.all()[ 1 ].args[ 0 ]).toEqual({
			effect: effectTwo,
			effectCheckingAgainst: effectsCombined,
		})
		expect(effectToggleOne.disabled).toBe(true)
		expect(effectToggleTwo.disabled).toBe(false)
	})
})
