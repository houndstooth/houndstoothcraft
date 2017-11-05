import * as execute from '../../../../src/execute'
import { composeMainHoundstooth } from '../../../../src/execute/composeMainHoundstooth'
import { InputElement } from '../../../../src/page'
import { state } from '../../../../src/state'
import { Effect } from '../../../../src/store/types'
import { buildEffectToggleClickHandler } from '../../../../src/ui/buildEffectToggleClickHandler'
import * as resetInterface from '../../../../src/ui/resetInterface'
import { NullarySideEffector } from '../../../../src/utilities/types'
import { buildMockElement } from '../../helpers/buildMockElement'
import { mockQuerySelector } from '../../helpers/mockQuerySelector'
import Spy = jasmine.Spy
import { SimulateClick } from '../../helpers/types'

describe('build effect toggle click handler returns a function which', () => {
	it('resets the interface, toggles selection of the effect it is for, and executes', () => {
		const resetInterfaceSpy: Spy = spyOn(resetInterface, 'resetInterface')

		const executeSelectedHoundstoothEffectsSpy: Spy = spyOn(execute, 'executeSelectedHoundstoothEffects')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		const checkbox: InputElement = buildMockElement()

		const houndstoothEffect: Effect = { name: 'mock tooth' }

		const clickHandler: NullarySideEffector = buildEffectToggleClickHandler({
			checkbox, houndstoothEffect,
		})

		expect(resetInterfaceSpy).not.toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()

		const preExistingHoundstoothEffect: Effect = { name: 'preexisting tooth' }
		state.selectedHoundstoothEffects = [ preExistingHoundstoothEffect ]

		simulateClick(checkbox, clickHandler)

		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, houndstoothEffect ])

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()

		resetInterfaceSpy.calls.reset()
		executeSelectedHoundstoothEffectsSpy.calls.reset()

		// To confirm that it preserves the order otherwise when removing an effect:
		const otherHoundstoothEffect: Effect = { name: 'other tooth' }
		state.selectedHoundstoothEffects.push(otherHoundstoothEffect)

		simulateClick(checkbox, clickHandler)

		expect(resetInterfaceSpy).toHaveBeenCalled()
		expect(state.selectedHoundstoothEffects).toEqual([ preExistingHoundstoothEffect, otherHoundstoothEffect ])
		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})

	describe('with respect to animation controls', () => {
		let playButton: HTMLButtonElement
		let pauseButton: HTMLButtonElement
		let rewindButton: HTMLButtonElement
		let checkbox: InputElement

		beforeEach(() => {
			const {
				playButton: tmpPlayButton,
				pauseButton: tmpPauseButton,
				rewindButton: tmpRewindButton,
			} = mockQuerySelector()
			playButton = tmpPlayButton as HTMLButtonElement
			pauseButton = tmpPauseButton as HTMLButtonElement
			rewindButton = tmpRewindButton as HTMLButtonElement

			// Do not want to deal with other document related stuff, but need the houndstooth composed.
			spyOn(execute, 'executeSelectedHoundstoothEffects').and.callFake(async () => {
				composeMainHoundstooth({ houndstoothEffects: state.selectedHoundstoothEffects })

				return new Promise<NullarySideEffector>((): void => undefined)
			})

			checkbox = buildMockElement()
		})

		it('enables the play button when the composed houndstooth has an animations pattern', () => {
			const effectWithAnimations: Effect = {
				animationsPattern: {
					gridSettings: { gridSize: (p: number): number => p },
				},
			}
			const clickHandler: NullarySideEffector = buildEffectToggleClickHandler({
				checkbox,
				houndstoothEffect: effectWithAnimations,
			})
			playButton.disabled = true

			simulateClick(checkbox, clickHandler)

			expect(playButton.disabled).toBe(false)
		})

		it('disables the play button when the composed houndstooth does not have an animations pattern', () => {
			const effectWithoutAnimations: Effect = { animationsPattern: {} }
			const clickHandler: NullarySideEffector = buildEffectToggleClickHandler({
				checkbox,
				houndstoothEffect: effectWithoutAnimations,
			})
			playButton.disabled = false

			simulateClick(checkbox, clickHandler)

			expect(playButton.disabled).toBe(true)
		})

		it('always disables the pause and rewind buttons', () => {
			pauseButton.disabled = false
			rewindButton.disabled = false
			const effectWithoutAnimations: Effect = { animationsPattern: {} }
			const clickHandler: NullarySideEffector = buildEffectToggleClickHandler({
				checkbox,
				houndstoothEffect: effectWithoutAnimations,
			})

			simulateClick(checkbox, clickHandler)

			expect(pauseButton.disabled).toBe(true)
			expect(rewindButton.disabled).toBe(true)
		})
	})
})

const simulateClick: SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector): void => {
	checkbox.checked = !checkbox.checked
	clickHandler()
}
