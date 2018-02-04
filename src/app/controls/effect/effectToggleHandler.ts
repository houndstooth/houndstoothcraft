import { appState } from '../../appState'
import {
	cancelCurrentPattern,
	clearAnimationIntervalAndRemoveFromState,
	executeEffect,
	resolveGrid,
} from '../../execute'
import { clearContexts, clearMixedDownContext } from '../../render'
import { resetMainHoundstooth } from '../../setting'
import { enableOrDisableAnimationControls } from '../animation'
import enableOrDisableOtherEffectToggles from './enableOrDisableOtherEffectToggles'
import updateDescriptions from './updateDescriptions'

const effectToggleHandler: (_: Event) => void =
	(effectToggleClickEvent: Event): void => {
		appState.dom.descriptionsContainer.innerHTML = ''

		clearContexts.default()
		clearMixedDownContext.default()

		clearAnimationIntervalAndRemoveFromState.default()

		resolveGrid.default()

		cancelCurrentPattern.default()
		resetMainHoundstooth.default()

		addOrRemoveEffect(effectToggleClickEvent)

		executeEffect.default()

		enableOrDisableAnimationControls.default()

		enableOrDisableOtherEffectToggles()

		updateDescriptions()
	}

const addOrRemoveEffect: (_: Event) => void =
	(effectToggleClickEvent: Event): void => {
		const checkbox: HTMLInputElement = effectToggleClickEvent.target as HTMLInputElement
		if (checkbox.checked) {
			appState.controls.selectedEffects.push(checkbox.name)
		}
		else {
			appState.controls.selectedEffects = appState.controls.selectedEffects.filter((selectedEffectName: string) =>
				selectedEffectName !== checkbox.name)
		}
	}

export default effectToggleHandler
