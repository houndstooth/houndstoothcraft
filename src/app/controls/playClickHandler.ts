import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { executeSelectedEffects } from '../execute'
import { mixDownContexts } from '../render'

const playClickHandler: NullarySideEffector =
	(): void => {
		appState.dom.playButton.disabled = true
		appState.dom.pauseButton.disabled = false
		appState.dom.rewindButton.disabled = false

		appState.controls.animating = true

		mixDownContexts.default()

		if (!resumingAnimation()) {
			executeSelectedEffects.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!appState.execute.animationInterval

export default playClickHandler
