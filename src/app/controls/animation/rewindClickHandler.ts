import { to } from '../../../utilities'
import { appState } from '../../appState'
import { clearAnimationIntervalAndRemoveFromState, executeEffect } from '../../execute'
import { clearMixedDownContext } from '../../render'
import updateCurrentFrame from './updateCurrentFrame'

const rewindClickHandler: () => void =
	(): void => {
		clearAnimationIntervalAndRemoveFromState.default()

		updateCurrentFrame(to.Frame(0))

		if (!appState.controls.animating) {
			appState.dom.rewindButton.disabled = true
			clearMixedDownContext.default()
		}

		executeEffect.default()
	}

export default rewindClickHandler
