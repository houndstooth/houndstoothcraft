import { NamedEffect } from '../../types'
import { appState } from '../appState'
import { cancelPreviousPattern, clearIntervalAndRemoveFromState, executeSelectedEffects } from '../execute'
import { clearContexts, clearMixedDownContext } from '../render'
import { resetMainHoundstooth } from '../settings'
import enableOrDisableAnimationControls from './enableOrDisableAnimationControls'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import updateDescriptions from './updateDescriptions'

const effectToggleClickHandler: (_: Event) => void =
	(event: Event): void => {
		appState.dom.descriptionsContainer.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		clearIntervalAndRemoveFromState.default('animationInterval')
		clearIntervalAndRemoveFromState.default('gridProgressInterval')

		appState.execute.resolveGrid()

		cancelPreviousPattern.default()
		resetMainHoundstooth.default()

		const checkbox: HTMLInputElement = event.target as HTMLInputElement
		const effect: NamedEffect = appState.settings.availableEffects[checkbox.name]
		const effectFunction: (_: NamedEffect) => void = checkbox.checked ? addEffect : removeEffect
		effectFunction(effect)

		executeSelectedEffects.default()

		enableOrDisableAnimationControls()

		enableOrDisableOtherEffectToggles()

		updateDescriptions()
	}

const addEffect: (_: NamedEffect) => void =
	(effect: NamedEffect): void => {
		appState.controls.selectedEffects.push(effect)
	}

const removeEffect: (_: NamedEffect) => void =
	(effect: NamedEffect): void => {
		// tslint:disable-next-line:max-line-length
		appState.controls.selectedEffects = appState.controls.selectedEffects.filter((selectedEffect: NamedEffect) =>
			selectedEffect.name !== effect.name)
	}

export default effectToggleClickHandler
