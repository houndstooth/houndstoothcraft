import {
	availableEffects,
	combineHoundstoothEffects,
	documentWrapper,
	Effect,
	effectsHaveConflicts,
	enableOrDisableOtherEffectToggles,
	NamedEffect,
	NullarySideEffector,
	PageElement,
	state,
} from '../../../../../src'
import { buildMockElement } from '../../../helpers'
import Spy = jasmine.Spy

const subject: NullarySideEffector = enableOrDisableOtherEffectToggles.default

describe('enableOrDisableOtherEffectToggles', () => {
	it('checks each available effect for conflicts with the effects the user currently has combined', () => {
		const effectsSelected: NamedEffect[] = []
		state.selectedHoundstoothEffects = effectsSelected

		const effectsCombined: Effect = { name: 'effects combined' }
		spyOn(combineHoundstoothEffects, 'default').and.returnValue(effectsCombined)

		const effectOne: Effect = { name: 'effect one' }
		const effectTwo: Effect = { name: 'effect two' }
		const effectsAvailable: Effect[] = [ effectOne, effectTwo ]
		spyOn(availableEffects, 'get').and.returnValue(effectsAvailable)

		const effectToggleOne: PageElement = buildMockElement()
		const effectToggleTwo: PageElement = buildMockElement()
		spyOn(documentWrapper, 'querySelector').and.callFake((selector: string): PageElement => {
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
