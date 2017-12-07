import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { mixDownContexts } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'

const playClickHandler: NullarySideEffector =
	(): void => {
		appState.dom.playButton.disabled = true
		appState.dom.pauseButton.disabled = false
		appState.dom.rewindButton.disabled = false

		appState.controls.animating = true

		mixDownContexts.default()

		if (!resumingAnimation()) {
			executeSelectedHoundstoothEffects.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!appState.execute.animationInterval

export default playClickHandler
