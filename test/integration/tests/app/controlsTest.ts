// tslint:disable:max-line-length

import * as effects from '../../../../effects'
import { GONGRAM_COLOR_SET } from '../../../../effects/gongram/constants'
import {
	appState, BLACK, createEffectToggles, Frame, NamedEffect, patternState, setupAvailableEffects, to,
	TRANSPARENT,
} from '../../../../src/indexForTest'
import { expectStandardPattern } from '../../helpers'
import { getGinghamChevronContinuumStripePositions } from '../../../../effects/gingham-chevron-continuum/pattern'

describe('controls', () => {
	const availableEffects: NamedEffect[] = Object.values(effects)
	beforeEach(() => {
		setupAvailableEffects.default(Object.values(availableEffects))
		createEffectToggles.default(Object.values(availableEffects))
	})

	describe('clicking an effect toggle', () => {
		it('toggles whether its associated effect is applied to the pattern state', () => {
			expect(patternState.colorSettings.colorSet).toEqual(to.ColorSet([ BLACK, TRANSPARENT ]))

			appState.dom.effectToggles.gongram.click()
			expect(patternState.colorSettings.colorSet).toEqual(GONGRAM_COLOR_SET)

			appState.dom.effectToggles.gongram.click()
			expect(patternState.colorSettings.colorSet).toEqual(to.ColorSet([ BLACK, TRANSPARENT ]))
		})

		it('keeps animating if the selection of effects changes while animation is playing, as long as the new effect selection is still animatable', () => {
			appState.dom.effectToggles[ 'gingham-chevron-continuum' ].click()

			appState.dom.playButton.click()
			expect(appState.controls.animating).toBe(true)

			appState.dom.effectToggles.gongram.click()
			expect(appState.controls.animating).toBe(true)

			expect(appState.dom.frameInput.disabled).toBe(false)
			expect(appState.dom.playButton.disabled).toBe(true)
			expect(appState.dom.pauseButton.disabled).toBe(false)
			expect(appState.dom.rewindButton.disabled).toBe(false)
		})

		it('stops animating if the selection of effects changes while animation is playing to a selection which is not animatable', () => {
			appState.dom.effectToggles[ 'gingham-chevron-continuum' ].click()
			appState.dom.playButton.click()
			expect(appState.controls.animating).toBe(true)

			const currentFrame: Frame = appState.controls.currentFrame
			appState.dom.effectToggles[ 'gingham-chevron-continuum' ].click()
			expect(appState.controls.animating).toBe(false)
			expect(appState.controls.currentFrame).toBe(currentFrame)

			expect(appState.dom.frameInput.disabled).toBe(true)
			expect(appState.dom.playButton.disabled).toBe(true)
			expect(appState.dom.pauseButton.disabled).toBe(true)
			expect(appState.dom.rewindButton.disabled).toBe(true)

			expectStandardPattern()
		})

		it('should not select the effect if it conflicts with another already selected effect', () => {
			appState.dom.effectToggles[ 'gingham-chevron-continuum' ].click()
			expect(patternState.stripeSettings.stripePositionSettings.getStripePositions).toBe(getGinghamChevronContinuumStripePositions.default)

			appState.dom.effectToggles[ 'harmonitooth' ].click()
			expect(patternState.stripeSettings.stripePositionSettings.getStripePositions).toBe(getGinghamChevronContinuumStripePositions.default)
		})
	})
})
