import * as execute from '../../../../../src/app/execute'
import { rewindClickHandler } from '../../../../../src/app/ui/rewindClickHandler'
import { state } from '../../../../../src/state'
import Spy = jasmine.Spy
import * as to from '../../../../../src/to'
import * as windowWrapper from '../../../../../src/utilities'
import { NullarySideEffector } from '../../../../../src/utilities/types'
import { mockQuerySelector } from '../../../helpers/mockQuerySelector'

describe('rewind click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let rewindButton: HTMLButtonElement
	beforeEach(() => {
		executeSelectedHoundstoothEffectsSpy = spyOn(execute, 'executeSelectedHoundstoothEffects')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		const { rewindButton: tmpRewindButton } = mockQuerySelector()
		rewindButton = tmpRewindButton as HTMLButtonElement
	})

	beforeEach(() => {
		spyOn(windowWrapper.windowWrapper, 'clearInterval')
	})

	it('clears the interval', () => {
		rewindClickHandler()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('resets the current frame', () => {
		state.currentFrame = to.Frame(5)

		rewindClickHandler()

		expect(state.currentFrame).toBe(to.Frame(0))
	})

	it('executes the selected houndstooth effects', () => {
		rewindClickHandler()

		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})

	describe('disabling itself', () => {
		it('does not if animating', () => {
			rewindButton.disabled = false
			state.animating = true

			rewindClickHandler()

			expect(rewindButton.disabled).toBe(false)
		})

		it('does if not animating', () => {
			rewindButton.disabled = false
			state.animating = false

			rewindClickHandler()

			expect(rewindButton.disabled).toBe(true)
		})
	})
})
