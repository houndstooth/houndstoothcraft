import * as executeSelectedHoundstoothEffects from '../../../../src/execute/executeSelectedHoundstoothEffects'
import { PageElement } from '../../../../src/page/types'
import { state } from '../../../../src/state'
import { pauseClickHandler, playClickHandler, rewindClickHandler } from '../../../../src/ui/animationControlHandlers'
import Spy = jasmine.Spy
import * as to from '../../../../src/utilities/to'
import * as windowWrapper from '../../../../src/utilities/windowWrapper'
import { buildMockElement } from '../../helpers/buildMockElement'

describe('animation control handlers', () => {
	let executeSelectedHoundstoothEffectsSpy: Spy
	beforeEach(() => {
		executeSelectedHoundstoothEffectsSpy = spyOn(executeSelectedHoundstoothEffects, 'executeSelectedHoundstoothEffects')
	})

	describe('#playClickHandler', () => {
		describe('when already animating', () => {
			beforeEach(() => {
				state.animating = true

				playClickHandler()
			})

			// tslint:disable-next-line:max-line-length
			it('stays animating (this situation where you could click the button while it is already animating should never be the case though once disabling works)', () => {
				expect(state.animating).toBe(true)
			})

			it('does not execute the selected houndstooth effects again', () => {
				expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
			})
		})

		describe('when not already animating', () => {
			beforeEach(() => {
				state.animating = false
			})

			it('set animating to true', () => {
				playClickHandler()

				expect(state.animating).toBe(true)
			})

			it('disables the play button', () => {
				const playButton: PageElement = buildMockElement()
				spyOn(windowWrapper.document, 'querySelector').and.returnValue(playButton)
				expect(playButton.disabled).toBe(undefined)

				playClickHandler()

				expect(playButton.disabled).toBe(true)
				expect(playButton.style.fill).toBe('#888')
			})

			describe('current frame', () => {
				describe('when 0', () => {
					beforeEach(() => {
						state.currentFrame = to.Frame(0)

						playClickHandler()
					})

					it('executes the selected houndstooth effects', () => {
						expect(executeSelectedHoundstoothEffectsSpy).toHaveBeenCalled()
					})
				})

				describe('when not 0 (restarting after a pause)', () => {
					beforeEach(() => {
						state.currentFrame = to.Frame(4000)

						playClickHandler()
					})

					it('does not re-execute the selected houndstooth effects', () => {
						expect(executeSelectedHoundstoothEffectsSpy).not.toHaveBeenCalled()
					})
				})
			})
		})
	})

	describe('#pauseClickHandler', () => {
		it('sets animating to false', () => {
			state.animating = true

			pauseClickHandler()

			expect(state.animating).toBe(false)
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
	})
})
