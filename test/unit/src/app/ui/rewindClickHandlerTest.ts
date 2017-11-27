import {
	executeSelectedHoundstoothEffects,
	NullarySideEffector,
	rewindClickHandler,
	state,
	to,
	windowWrapper,
} from '../../../../../src'
import Spy = jasmine.Spy
import { mockQuerySelector } from '../../../helpers'

describe('rewind click handler', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	let rewindButton: HTMLButtonElement
	beforeEach(() => {
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'default')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		const { rewindButton: tmpRewindButton } = mockQuerySelector()
		rewindButton = tmpRewindButton as HTMLButtonElement
	})

	beforeEach(() => {
		spyOn(windowWrapper, 'clearInterval')
	})

	it('clears the interval', () => {
		rewindClickHandler.default()

		// tslint:disable-next-line:no-unsafe-any
		expect(windowWrapper.clearInterval).toHaveBeenCalledWith(state.interval)
	})

	it('resets the current frame', () => {
		state.currentFrame = to.Frame(5)

		rewindClickHandler.default()

		expect(state.currentFrame).toBe(to.Frame(0))
	})

	it('executes the selected houndstooth effects', () => {
		rewindClickHandler.default()

		expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
	})

	describe('disabling itself', () => {
		it('does not if animating', () => {
			rewindButton.disabled = false
			state.animating = true

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(false)
		})

		it('does if not animating', () => {
			rewindButton.disabled = false
			state.animating = false

			rewindClickHandler.default()

			expect(rewindButton.disabled).toBe(true)
		})
	})
})
