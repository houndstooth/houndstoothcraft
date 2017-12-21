import { appState } from '../../appState'
import { executeEffect } from '../../execute'
import { mixDownContexts } from '../../render'

const playClickHandler: () => void =
	(): void => {
		appState.dom.playButton.disabled = true
		appState.dom.pauseButton.disabled = false
		appState.dom.rewindButton.disabled = false

		appState.controls.animating = true

		mixDownContexts.default()

		if (!resumingAnimation()) {
			executeEffect.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!appState.execute.animationInterval

export default playClickHandler
