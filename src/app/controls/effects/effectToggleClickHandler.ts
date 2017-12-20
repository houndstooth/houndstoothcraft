import { appState } from '../../appState'
import { cancelPreviousPattern, clearIntervalAndRemoveFromState, executePattern } from '../../execute'
import { clearContexts, clearMixedDownContext } from '../../render'
import { resetMainHoundstooth } from '../../settings'
import { enableOrDisableAnimationControls } from '../animation'
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

		addOrRemoveEffect(event)

		executePattern.default()

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
