import * as executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../../../../src/ui/animationControlHandlers'
import Spy = jasmine.Spy
import * as to from '../../../../src/utilities/to'
import { NullarySideEffector } from '../../../../src/utilities/types'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('animation control handlers', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	const playButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
	const pauseButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement
	const rewindButton: HTMLButtonElement = buildMockElement() as HTMLButtonElement

	beforeEach(() => {
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'executeSelectedHoundstoothEffects')
			.and.returnValue(new Promise<NullarySideEffector>((): void => undefined))

		spyOn(windowWrapper.document, 'querySelector').and.callFake((selector: string): PageElement => {
			switch (selector) {
				case '.play-button':
					return playButton
				case '.pause-button':
					return pauseButton
				case '.rewind-button':
					return rewindButton
				default:
					return buildMockElement()
			}
		})
	})

	describe('#playClickHandler', () => {
		describe('when already animating', () => {
			beforeEach(() => {
				state.animating = true
				playButton.disabled = true
				pauseButton.disabled = false
			})

			// tslint:disable-next-line:max-line-length
			it('stays animating (this situation where you could click the button while it is already animating should never be the case though once disabling works)', () => {
				playClickHandler()

				expect(state.animating).toBe(true)
			})

			it('keeps the play button disabled', () => {
				playClickHandler()

				expect(playButton.disabled).toBe(true)
			})

			it('keeps the pause button enabled', () => {
				playClickHandler()

				expect(pauseButton.disabled).toBe(false)
			})

			it('does not execute the selected houndstooth effects again', () => {
				playClickHandler()

				expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
			})
		})

		describe('when not already animating', () => {
			beforeEach(() => {
				state.animating = false
				playButton.disabled = false
				pauseButton.disabled = true
			})

			it('set animating to true', () => {
				playClickHandler()

				expect(state.animating).toBe(true)
			})

			it('disables the play button', () => {
				playClickHandler()

				expect(playButton.disabled).toBe(true)
			})

			it('enables the pause button', () => {
				playClickHandler()

				expect(pauseButton.disabled).toBe(false)
			})

			describe('current frame', () => {
				describe('when 0', () => {
					beforeEach(() => {
						state.currentFrame = to.Frame(0)
					})

					it('executes the selected houndstooth effects', () => {
						playClickHandler()

						expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
					})

					it('enables the rewind button', () => {
						rewindButton.disabled = true

						playClickHandler()

						expect(rewindButton.disabled).toBe(false)
					})
				})

				describe('when not 0 (restarting after a pause)', () => {
					beforeEach(() => {
						state.currentFrame = to.Frame(4000)
					})

					it('does not re-execute the selected houndstooth effects', () => {
						playClickHandler()

						expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
					})
				})
			})
		})
	})

	describe('#pauseClickHandler', () => {
		it('sets animating to false', () => {
			state.animating = true
			playButton.disabled = true
			pauseButton.disabled = false

			pauseClickHandler()

			expect(state.animating).toBe(false)
		})

		it('enables the play button', () => {
			pauseClickHandler()

			expect(playButton.disabled).toBe(false)
		})

		it('disables the pause button', () => {
			pauseClickHandler()

			expect(pauseButton.disabled).toBe(true)
		})
	})

	describe('#rewindClickHandler', () => {
		beforeEach(() => {
			spyOn(windowWrapper.window, 'clearInterval')
		})

		it('clears the interval', () => {
			rewindClickHandler()

			// tslint:disable-next-line:no-unsafe-any
			expect(windowWrapper.window.clearInterval).toHaveBeenCalledWith(state.interval)
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
})
