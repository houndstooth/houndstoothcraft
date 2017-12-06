import { NullarySideEffector } from '../../utilities'
import { mixDownContexts } from '../canvas'
import { executeSelectedHoundstoothEffects } from '../execute'
import { state } from '../state'

const playClickHandler: NullarySideEffector =
	(): void => {
		state.dom.playButton.disabled = true
		state.dom.pauseButton.disabled = false
		state.dom.rewindButton.disabled = false

		state.controls.animating = true

		mixDownContexts.default()

		if (!resumingAnimation()) {
			executeSelectedHoundstoothEffects.default()
		}
	}

const resumingAnimation: () => boolean =
	(): boolean => !!state.execute.animationInterval

export default playClickHandler
