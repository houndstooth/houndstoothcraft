import { appState } from '../../appState'
import { cancelCurrentPattern, clearAnimationIntervalAndRemoveFromState, executeEffect } from '../../execute'
import { clearContexts, clearMixedDownContext } from '../../render'
import { resetMainHoundstooth } from '../../setting'
import { enableOrDisableAnimationControls } from '../animation'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import updateDescriptions from './updateDescriptions'

const effectToggleClickHandler: (_: Event) => void =
	(event: Event): void => {
		appState.dom.descriptionsContainer.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		clearAnimationIntervalAndRemoveFromState.default()

		appState.execute.resolveGrid()

		cancelCurrentPattern.default()
		resetMainHoundstooth.default()

		addOrRemoveEffect(event)

		executeEffect.default()

		enableOrDisableAnimationControls.default()

		enableOrDisableOtherEffectToggles()

		updateDescriptions()
	}

const addOrRemoveEffect: (_: Event) => void =
	(event: Event): void => {
		const checkbox: HTMLInputElement = event.target as HTMLInputElement
		if (checkbox.checked) {
			appState.controls.selectedEffects.push(checkbox.name)
		}
		else {
			appState.controls.selectedEffects = appState.controls.selectedEffects.filter((selectedEffectName: string) =>
				selectedEffectName !== checkbox.name)
		}
	}

export default effectToggleClickHandler
