import { appState, mainHoundstoothHasAnimations, updateAnimatingState } from '../../../../../../src/indexForTest'
import Spy = jasmine.Spy

describe('updating animating state', () => {
	let subject: () => void
	let mainHoundstoothHasAnimationsSpy: Spy
	beforeEach(() => {
		subject = updateAnimatingState.default
		mainHoundstoothHasAnimationsSpy = spyOn(mainHoundstoothHasAnimations, 'default')
	})

	describe('when not animating', () => {
		beforeEach(() => {
			appState.controls.animating = false

			subject()
		})

		it('leaves it not animating', () => {
			expect(appState.controls.animating).toBe(false)
		})
	})

	describe('when animating', () => {
		beforeEach(() => {
			appState.controls.animating = true
		})

		describe('when the animation is still animatable', () => {
			beforeEach(() => {
				mainHoundstoothHasAnimationsSpy.and.returnValue(true)

				subject()
			})

			it('continues animating', () => {
				expect(appState.controls.animating).toBe(true)
			})
		})

		describe('when the animation is no longer animatable', () => {
			beforeEach(() => {
				mainHoundstoothHasAnimationsSpy.and.returnValue(false)

				subject()
			})

			it('stops animating', () => {
				expect(appState.controls.animating).toBe(false)
			})
		})
	})
})
